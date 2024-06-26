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

## Exposing Public URL
After deploying the CloudFormation stack, follow these steps to find the public URL:

1. Navigate to the AWS Management Console.
2. Go to the CloudFormation service.
3. Select the stack created by the CloudFormation template.
4. In the stack details, navigate to the "Outputs" tab.
5. Look for an output named something like "WebServerURL" or "PublicURL".
6. Copy the provided URL.
7. Paste the URL into a web browser.

Now, you should be able to access the web server of the parking lot management system using the public URL. ENJOY!!!


