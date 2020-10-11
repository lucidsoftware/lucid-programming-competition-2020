#!/bin/bash
for i in {0..9}
do
    dotnet run . < ../../tests/$i.in > ../../tests/$i.out
done
