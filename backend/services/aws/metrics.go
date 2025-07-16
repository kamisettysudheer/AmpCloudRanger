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
	Metrics []SingleMetricResponse `json:"metrics"`
}

type SingleMetricResponse struct {
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
	instanceId := "i-07de425e3cb0dbb7a"
	metricsToFetch := []struct {
		Name      string
		Namespace string
		Unit      string
	}{
		{"CPUUtilization", "AWS/EC2", "%"},
		{"MemoryUtilization", "CWAgent", "%"},
		{"NetworkIn", "AWS/EC2", "Bytes"},
	}
	var allMetrics []SingleMetricResponse
	for _, m := range metricsToFetch {
		input := &cloudwatch.GetMetricStatisticsInput{
			Namespace:  aws.String(m.Namespace),
			MetricName: aws.String(m.Name),
			StartTime:  aws.Time(time.Now().Add(-1 * time.Hour)),
			EndTime:    aws.Time(time.Now()),
			Period:     aws.Int32(300),
			Statistics: []types.Statistic{types.StatisticAverage},
			Dimensions: []types.Dimension{
				{
					Name:  aws.String("InstanceId"),
					Value: aws.String(instanceId),
				},
			},
		}
		result, err := cw.GetMetricStatistics(ctx, input)
		if err != nil {
			// skip this metric but continue others
			continue
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
		allMetrics = append(allMetrics, SingleMetricResponse{
			Data:   data,
			Unit:   m.Unit,
			Metric: m.Name,
		})
	}
	return &MetricResponse{Metrics: allMetrics}, nil
}
