package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/kamisettysudheer/ampcloudranger/backend/services"
)

func RegisterRoutes(router *gin.Engine) {
	// Metrics endpoint
	router.GET("/metrics", func(c *gin.Context) {
		// Call the implemented metrics logic from services/aws/metrics.go
		metricsData, err := services.GetAWSMetrics()
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, metricsData)
	})

	// Billing endpoint
	router.GET("/billing", func(c *gin.Context) {
		// TODO: Implement billing logic
		c.JSON(200, gin.H{"message": "billing endpoint"})
	})

	// Alerts endpoints
	router.GET("/alerts", func(c *gin.Context) {
		// TODO: Implement list alerts logic
		c.JSON(200, gin.H{"message": "alerts endpoint"})
	})

	router.POST("/alerts", func(c *gin.Context) {
		// TODO: Implement create alert logic
		c.JSON(200, gin.H{"message": "alert created"})
	})

	// Export endpoints
	router.POST("/export", func(c *gin.Context) {
		// TODO: Implement export logic
		c.JSON(200, gin.H{"message": "export requested"})
	})

	router.GET("/export/:id", func(c *gin.Context) {
		// TODO: Implement export status/download logic
		c.JSON(200, gin.H{"message": "export status"})
	})
}
