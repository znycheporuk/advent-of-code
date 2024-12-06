package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
)

const (
	testFileName = "1/input.test.txt"
	fileName     = "1/input.txt"
)

func main() {
	sum := calculateDistancePart1(fileName)
	fmt.Println(sum)

	sum = calculateDistancePart2(fileName)
	fmt.Println(sum)
}

func readFileAndConvertToColumns(filePath string) (left []int, right []int) {
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		columns := strings.Fields(line)
		if len(columns) != 2 {
			log.Fatalf("Invalid line format: %s", line)
		}
		l, err := strconv.Atoi(columns[0])
		if err != nil {
			log.Fatalf("Error converting left column to int: %v", err)
		}
		r, err := strconv.Atoi(columns[1])
		if err != nil {
			log.Fatalf("Error converting right column to int: %v", err)
		}
		left = append(left, l)
		right = append(right, r)
	}

	if err := scanner.Err(); err != nil {
		log.Fatalf("Error reading file: %v", err)
	}

	return left, right
}

func calculateDistancePart1(filePath string) int {
	left, right := readFileAndConvertToColumns(filePath)

	sort.Ints(left)
	sort.Ints(right)

	var res int
	for i := range left {
		res += abs(left[i] - right[i])
	}
	return res
}

func calculateDistancePart2(filePath string) int {
	left, right := readFileAndConvertToColumns(filePath)

	sort.Ints(left)
	sort.Ints(right)

	var res int
	var lastRight int
	var rightCount int
	var lastRightIndex int
	for _, l := range left {
		if l != lastRight {
			rightCount = 0
			for {
				if lastRightIndex >= len(right) {
					break
				}
				if right[lastRightIndex] > l {
					break
				}
				lastRight = right[lastRightIndex]

				if lastRight < l {
					lastRightIndex++
				} else if lastRight == l {
					lastRightIndex++
					rightCount++
				}
			}
		}
		res += l * rightCount
	}
	return res
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
