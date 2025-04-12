// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRentalAgreement {
    function landlord() external view returns (address);
    function tenant() external view returns (address);
    function isActive() external view returns (bool);
    function endDate() external view returns (uint);
}

contract TenantReview {
    struct Review {
        address reviewer;     // Landlord address
        address tenant;       // Tenant address
        uint rating;          // Rating (e.g., 1-5)
        string comments;      // Additional comments
        uint timestamp;       // When the review was created
        address rentalContract; // Reference to the rental agreement
    }

    // Mapping from tenant address to array of reviews
    mapping(address => Review[]) public tenantReviews;
    
    event ReviewAdded(address indexed tenant, address indexed reviewer, uint rating);

    function addReview(
        address rentalContractAddress,
        uint rating,
        string memory comments
    ) external {
        IRentalAgreement rentalAgreement = IRentalAgreement(rentalContractAddress);
        
        // Verify the reviewer is the landlord from the rental agreement
        require(msg.sender == rentalAgreement.landlord(), "Only the landlord can leave a review");
        
        // Can only review after rental has ended or is inactive
        require(
            !rentalAgreement.isActive() || block.timestamp > rentalAgreement.endDate(),
            "Can only review after rental period ends"
        );
        
        // Rating must be between 1 and 5
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        
        address tenantAddress = rentalAgreement.tenant();
        
        Review memory newReview = Review({
            reviewer: msg.sender,
            tenant: tenantAddress,
            rating: rating,
            comments: comments,
            timestamp: block.timestamp,
            rentalContract: rentalContractAddress
        });
        
        tenantReviews[tenantAddress].push(newReview);
        
        emit ReviewAdded(tenantAddress, msg.sender, rating);
    }
    
    // Updated function to return decomposed review data
    function getTenantReviews(address tenant) external view returns (
        address[] memory reviewers,
        uint[] memory ratings,
        string[] memory commentsList,
        uint[] memory timestamps,
        address[] memory rentalContracts
    ) {
        Review[] storage reviews = tenantReviews[tenant];
        uint reviewCount = reviews.length;
        
        // Initialize arrays with the correct size
        reviewers = new address[](reviewCount);
        ratings = new uint[](reviewCount);
        commentsList = new string[](reviewCount);
        timestamps = new uint[](reviewCount);
        rentalContracts = new address[](reviewCount);
        
        // Populate the arrays with data from the reviews
        for (uint i = 0; i < reviewCount; i++) {
            reviewers[i] = reviews[i].reviewer;
            ratings[i] = reviews[i].rating;
            commentsList[i] = reviews[i].comments;
            timestamps[i] = reviews[i].timestamp;
            rentalContracts[i] = reviews[i].rentalContract;
        }
        
        return (reviewers, ratings, commentsList, timestamps, rentalContracts);
    }
    
    // Additional helper function to get a specific review by index
    function getTenantReviewByIndex(address tenant, uint index) external view returns (
        address reviewer,
        uint rating,
        string memory comments,
        uint timestamp,
        address rentalContract
    ) {
        require(index < tenantReviews[tenant].length, "Review index out of bounds");
        
        Review storage review = tenantReviews[tenant][index];
        
        return (
            review.reviewer,
            review.rating,
            review.comments,
            review.timestamp,
            review.rentalContract
        );
    }
    
    // Get number of reviews for a tenant
    function getReviewCount(address tenant) external view returns (uint) {
        return tenantReviews[tenant].length;
    }
    
    function getAverageRating(address tenant) external view returns (uint) {
        Review[] memory reviews = tenantReviews[tenant];
        
        if (reviews.length == 0) {
            return 0;
        }
        
        uint totalRating = 0;
        for (uint i = 0; i < reviews.length; i++) {
            totalRating += reviews[i].rating;
        }
        
        return totalRating / reviews.length;
    }
}