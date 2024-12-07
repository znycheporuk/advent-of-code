package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

const (
	testFileName = "4/input.test.txt"
	fileName     = "4/input.txt"
)

func main() {
	total := part1(fileName)
	fmt.Println(total)
	total = part2(fileName)
	fmt.Println(total)
}

func readFile(filePath string) []string {
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	matrix := []string{}
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) > 0 {
			matrix = append(matrix, line)
		}
	}
	if err := scanner.Err(); err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	return matrix
}

const xmas string = "XMAS"
const mas string = "MAS"

func checkDirection(matrix []string, sx int, sy int, dx int, dy int, word string) bool {
	for i := 0; i < len(word); i++ {
		x := sx + i*dx
		y := sy + i*dy
		if x < 0 || x >= len(matrix) || y < 0 || y >= len(matrix[0]) || matrix[x][y] != word[i] {
			return false
		}
	}
	return true
}

func part1(filePath string) int {
	matrix := readFile(filePath)
	total := 0
	for i, line := range matrix {
		for j := range line {
			if line[j] != xmas[0] {
				continue
			}
			for k := -1; k <= 1; k++ {
				for l := -1; l <= 1; l++ {
					if checkDirection(matrix, i, j, k, l, xmas) {
						total++
					}
				}
			}
		}
	}
	return total
}

func checkCross(matrix []string, sx int, sy int, word string) bool {
	d1 := checkDirection(matrix, sx-1, sy-1, 1, 1, word)
	d2 := checkDirection(matrix, sx+1, sy+1, -1, -1, word)
	d3 := checkDirection(matrix, sx+1, sy-1, -1, 1, word)
	d4 := checkDirection(matrix, sx-1, sy+1, 1, -1, word)

	if (d1 || d2) && (d3 || d4) {
		return true
	}

	return false
}

func part2(filePath string) int {
	matrix := readFile(filePath)
	total := 0
	for i, line := range matrix {
		for j := range line {
			if line[j] != mas[1] {
				continue
			}
			if checkCross(matrix, i, j, mas) {
				total++
			}
		}
	}
	return total
}
