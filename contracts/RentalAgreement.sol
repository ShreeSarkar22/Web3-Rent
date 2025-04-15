// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalContract {
    // Rental Agreement variables
    address public tenant;
    address public landlord;
    string public propertyDetails;
    uint public startDate;
    uint public endDate;
    uint public rentAmount;
    uint public lastPaymentTimestamp;
    uint public dueInterval; // in days
    bool public isActive;

    // Payment Log variables
    struct Payment {
        uint amount;
        uint timestamp;
        address payer;
    }
    
    Payment[] public payments;

    // Events
    event AgreementCreated(address indexed tenant, address indexed landlord, uint startDate, uint endDate);
    event AgreementEnded(uint timestamp);
    event PaymentRecorded(uint amount, uint timestamp, address payer);

    modifier onlyParties() {
        require(msg.sender == tenant || msg.sender == landlord, "Only tenant or landlord can call this");
        _;
    }

    modifier onlyLandlord() {
        require(msg.sender == landlord, "Only landlord can call this");
        _;
    }

    function createAgreement(
        address _tenant,
        string memory _propertyDetails,
        uint _startDate,
        uint _endDate,
        uint _rentAmount,
        uint _dueInterval
    ) external {
        require(_tenant != address(0), "Invalid tenant address");
        require(_startDate < _endDate, "End date must be after start date");
        require(_rentAmount > 0, "Rent amount must be greater than zero");
        require(_dueInterval > 0, "Due interval must be greater than zero");
        
        landlord = msg.sender;
        tenant = _tenant;
        propertyDetails = _propertyDetails;
        startDate = _startDate;
        endDate = _endDate;
        rentAmount = _rentAmount;
        dueInterval = _dueInterval * 1 days; //Remove the ( 1 days ) part to do in seconds
        isActive = true;

        emit AgreementCreated(tenant, landlord, startDate, endDate);
    }

    function endAgreement() external onlyParties {
        require(isActive, "Agreement already ended");
        isActive = false;
        emit AgreementEnded(block.timestamp);
    }

    function recordPayment() external payable onlyParties {
        require(isActive, "Agreement is not active");
        
        // Log the payment
        Payment memory payment = Payment({
            amount: msg.value,
            timestamp: block.timestamp,
            payer: msg.sender
        });
        
        payments.push(payment);
        
        // Update last payment timestamp
        lastPaymentTimestamp = block.timestamp;
        
        emit PaymentRecorded(msg.value, block.timestamp, msg.sender);
    }

    function verifyRentStatus() public view returns (string memory) {
        uint lastPaid = lastPaymentTimestamp > 0 ? lastPaymentTimestamp : startDate;
        uint nextDue = lastPaid + dueInterval;

        if (block.timestamp < nextDue) {
            return "Paid";
        } else {
            return "Missed";
        }
    }
    
    function getContractAddress() public view returns (address) {
        return address(this);
    }
    
    // Get number of payments
    function getPaymentCount() external view returns (uint) {
        return payments.length;
    }
    
    // Get payment details by index
    function getPaymentByIndex(uint index) external view returns (
        uint amount,
        uint timestamp,
        address payer
    ) {
        require(index < payments.length, "Payment index out of bounds");
        Payment storage payment = payments[index];
        
        return (payment.amount, payment.timestamp, payment.payer);
    }
    
    // Get all payments (returns separate arrays)
    function getAllPayments() external view returns (
        uint[] memory amounts,
        uint[] memory timestamps,
        address[] memory payers
    ) {
        uint count = payments.length;
        
        amounts = new uint[](count);
        timestamps = new uint[](count);
        payers = new address[](count);
        
        for (uint i = 0; i < count; i++) {
            amounts[i] = payments[i].amount;
            timestamps[i] = payments[i].timestamp;
            payers[i] = payments[i].payer;
        }
        
        return (amounts, timestamps, payers);
    }
}