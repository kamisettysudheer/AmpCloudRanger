package main

import (
	"context"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatch"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatch/types"
)

func metrics() {
	ctx := context.TODO()
	cfg, err := config.LoadDefaultConfig(ctx, config.WithRegion("eu-north-1"))
	if err != nil {
		panic("unable to load SDK config: " + err.Error())
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
		panic("failed to get metric: " + err.Error())
	}

	for _, dp := range result.Datapoints {
		fmt.Printf("%v: %.2f%%\n", *dp.Timestamp, *dp.Average)
	}
}
