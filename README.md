# Parking Lot Management System

## Nir Nussbaum & Roi Naveh

## Scenario
The system supports the following actions:
- **Entry**: Records the time, license plate, and parking lot when a vehicle enters.
- **Exit**: Computes the charge for the parked time and provides information including license plate, total parked time, parking lot ID, and charge upon exit.

## Pricing
The charge for parking is $10 per hour, computed in 15-minute increments.

## Endpoints
Two HTTP endpoints are implemented:
1. `POST /entry?plate=123-123-123&parkingLot=382`
   - Returns a ticket ID upon successful entry.
2. `POST /exit?ticketId=1234`
   - Returns information about the parked vehicle including license plate, total parked time, parking lot ID, and charge.

## Technology Stack
- **Language**: JavaScript
- **Framework**: Node.js
- **Deployment**: AWS (EC2 Instance)

# CloudFormation Template
A CloudFormation template (`cloudFormation.json`) is provided in the repository to create the stack.

