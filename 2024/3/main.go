package main

import (
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
)

const (
	testFileName = "3/input.test.txt"
	fileName     = "3/input.txt"
)

var mulReg = regexp.MustCompile(`mul\((\d{1,3}),(\d{1,3})\)`)
var doReg = regexp.MustCompile(`do\(\)`)
var dontReg = regexp.MustCompile(`don't\(\)`)

func main() {
	sum := part1(fileName)
	fmt.Println(sum)
	sum = part2(fileName)
	fmt.Println(sum)

}

func readFile(filePath string) string {
	content, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	return string(content)
}

func part1(filePath string) int {
	corruptedMemory := readFile(filePath)
	matches := mulReg.FindAllStringSubmatch(corruptedMemory, -1)
	sum := 0
	for _, match := range matches {
		x, err1 := strconv.Atoi(match[1])
		y, err2 := strconv.Atoi(match[2])
		if err1 == nil && err2 == nil {
			sum += x * y
		}
	}
	return sum
}

func part2(filePath string) int {
	corruptedMemory := readFile(filePath)
	mulEnabled := true
	sum := 0
	for len(corruptedMemory) > 0 {
		mulMatch := mulReg.FindStringSubmatchIndex(corruptedMemory)
		doMatch := doReg.FindStringIndex(corruptedMemory)
		dontMatch := dontReg.FindStringIndex(corruptedMemory)
		nextInstruction := ""
		nextIndex := len(corruptedMemory)

		if mulMatch != nil && mulMatch[0] < nextIndex {
			nextInstruction = "mul"
			nextIndex = mulMatch[0]
		}
		if doMatch != nil && doMatch[0] < nextIndex {
			nextInstruction = "do"
			nextIndex = doMatch[0]
		}
		if dontMatch != nil && dontMatch[0] < nextIndex {
			nextInstruction = "don't"
			nextIndex = dontMatch[0]
		}
		switch nextInstruction {
		case "mul":
			if mulEnabled {
				x, err1 := strconv.Atoi(corruptedMemory[mulMatch[2]:mulMatch[3]])
				y, err2 := strconv.Atoi(corruptedMemory[mulMatch[4]:mulMatch[5]])
				if err1 == nil && err2 == nil {
					sum += x * y
				}
			}
			corruptedMemory = corruptedMemory[mulMatch[1]:]
		case "do":
			mulEnabled = true
			corruptedMemory = corruptedMemory[doMatch[1]:]
		case "don't":
			mulEnabled = false
			corruptedMemory = corruptedMemory[dontMatch[1]:]
		default:
			corruptedMemory = ""
		}
	}

	return sum
}
