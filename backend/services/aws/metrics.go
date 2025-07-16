package services

import (
	"context"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatch"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatch/types"
)

type MetricDataPoint struct {
	Timestamp string  `json:"timestamp"`
	Value     float64 `json:"value"`
}

type MetricResponse struct {
	Data   []MetricDataPoint `json:"data"`
	Unit   string            `json:"unit"`
	Metric string            `json:"metric"`
}

func GetAWSMetrics() (*MetricResponse, error) {
	ctx := context.TODO()
	cfg, err := config.LoadDefaultConfig(ctx, config.WithRegion("eu-north-1"))
	if err != nil {
		return nil, err
	}

	cw := cloudwatch.NewFromConfig(cfg)

	input := &cloudwatch.GetMetricStatisticsInput{
		Namespace:  aws.String("AWS/EC2"),
		MetricName: aws.String("CPUUtilization"),
		StartTime:  aws.Time(time.Now().Add(-1 * time.Hour)),
		EndTime:    aws.Time(time.Now()),
		Period:     aws.Int32(300),
		Statistics: []types.Statistic{types.StatisticAverage},
		Dimensions: []types.Dimension{
			{
				Name:  aws.String("InstanceId"),
				Value: aws.String("i-07de425e3cb0dbb7a"),
			},
		},
	}

	result, err := cw.GetMetricStatistics(ctx, input)
	if err != nil {
		return nil, err
	}

	data := make([]MetricDataPoint, 0, len(result.Datapoints))
	for _, dp := range result.Datapoints {
		if dp.Timestamp != nil && dp.Average != nil {
			data = append(data, MetricDataPoint{
				Timestamp: dp.Timestamp.Format(time.RFC3339),
				Value:     *dp.Average,
			})
		}
	}

	resp := &MetricResponse{
		Data:   data,
		Unit:   "%",
		Metric: "CPUUtilization",
	}
	return resp, nil
}
