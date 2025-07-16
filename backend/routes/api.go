package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	// Metrics endpoint
	router.GET("/metrics", func(c *gin.Context) {
		// TODO: Implement metrics logic
		c.JSON(200, gin.H{"message": "metrics endpoint"})
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
