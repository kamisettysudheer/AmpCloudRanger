package services

// Dummy billing response for now
type BillingServiceCost struct {
    Service string  `json:"service"`
    Cost    float64 `json:"cost"`
    LastMonth float64 `json:"lastMonth"`
}

type BillingResponse struct {
    Costs []BillingServiceCost `json:"costs"`
}

func GetAWSBilling() (*BillingResponse, error) {
    // Simulate backend response, replace with AWS Cost Explorer API logic
    return &BillingResponse{
        Costs: []BillingServiceCost{
            {Service: "EC2", Cost: 1200, LastMonth: 1200},
            {Service: "RDS", Cost: 800, LastMonth: 800},
            {Service: "Lambda", Cost: 500, LastMonth: 600},
            {Service: "S3", Cost: 400, LastMonth: 400},
            {Service: "Other", Cost: 300, LastMonth: 300},
        },
    }, nil
}
