package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

const (
	testFileName = "2/input.test.txt"
	fileName     = "2/input.txt"
)

func main() {
	numOfSafeReports := getNumOfSafeReports1(fileName)
	fmt.Println(numOfSafeReports)
	numOfSafeReports = getNumOfSafeReports2(fileName)
	fmt.Println(numOfSafeReports)

}
func readReports(fileName string) [][]int {
	file, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var reports [][]int
	for scanner.Scan() {
		line := scanner.Text()
		columns := strings.Fields(line)
		if len(columns) == 0 {
			continue
		}
		var levels []int
		for _, char := range columns {
			num, err := strconv.Atoi(char)
			if err != nil {
				log.Fatalf("Error converting character to integer: %v", err)
			}
			levels = append(levels, num)
		}
		reports = append(reports, levels)
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	return reports
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func isReportSafe(report []int) bool {
	isSafe := true
	var isAccending bool
	var isDeccending bool

	for i := 0; i <= len(report)-2; i++ {
		delta := abs(report[i] - report[i+1])
		if delta == 0 || delta > 3 {
			isSafe = false
			break
		}
		if report[i] < report[i+1] {
			isAccending = true
		}
		if report[i] > report[i+1] {
			isDeccending = true
		}
		if isAccending && isDeccending {
			isSafe = false
			break
		}
	}
	return isSafe
}

func getNumOfSafeReports1(fileName string) int {
	reports := readReports(fileName)
	var numOfSafeReports int
	for _, report := range reports {
		isSafe := isReportSafe(report)
		if isSafe {
			numOfSafeReports += 1
		}
	}
	return numOfSafeReports
}

func getNumOfSafeReports2(fileName string) int {
	reports := readReports(fileName)
	var numOfSafeReports int
	for _, report := range reports {
		isSafe := isReportSafe(report)
		if !isSafe {
			for i := 0; i < len(report); i++ {
				isSafe = isReportSafe(removeIndex(report, i))
				if isSafe {
					break
				}
			}
		}
		if isSafe {
			numOfSafeReports += 1
		}
	}
	return numOfSafeReports
}

func removeIndex(s []int, index int) []int {
	cpy := make([]int, len(s)-1)
	copy(cpy, s[:index])
	copy(cpy[index:], s[index+1:])
	return cpy
}
