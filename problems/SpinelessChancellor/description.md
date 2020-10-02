# Spineless Chancellor
## Description
The Supreme Chancellor of the Galactic Senate is a spineless politician with no real opinions of her own. Whenever an issue comes before the Galactic Senate, the Chancellor consults the most recent polling on the issues and then votes optimally to spare her public reputation. Its not as simple as just seeing how many people are for, or against, however. The Chancellors own top social scientists have determined that its actually more import _not_ to vote for something the voting public opposes than it is to vote _for_ something people are in favor of. In fact, the Chancellors experts have determined that a "no" in the polls is worth _twice_ as much as a "yes" in terms of impact on the Chancellor's reputation.

Given a list of poll responses for a set of issues, output how the Chancellor should vote on each issue with a "yes", "no", or an "abstain" if its really impossible to determine one way or the other. (The Chancellor just needs more time to _really_ think through the issue before committing to a decision. One musn't rush these things you know!)

### Input
Input will begin with a number _I_ indicating the number of issues on the poll sheets, followed by each issue id on its own line. The next number _P_ will indicate how many poll sheets there are to process, with each having a "yes", "no", or "unsure" response next to each issue indicating the voters support on that issue.
```
4
P105
A461
D700
P226
3
P105 yes
A461 yes
D700 no
P226 no
P105 yes
A461 no
D700 yes
P226 unsure
P105 unsure
A461 unsure
D700 yes
P226 no
```
### Output
```
P105 yes
A461 no
D700 abstain
P226 no
```
