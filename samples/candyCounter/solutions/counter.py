#!/usr/bin/env python

line1 = raw_input()
numberFriends = int(line1.replace("Friends: ", ""))
numberPeople = numberFriends + 1

line2 = raw_input()
numberCandies = int(line2.replace("Candy: ", ""))

if numberCandies >= numberPeople:
    print numberCandies - numberPeople
else:
    print "Not enough candy."