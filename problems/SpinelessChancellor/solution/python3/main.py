
nIssues = int(input())
issues = dict()
issuesInOrder = []
for i in range(nIssues):
    issue = input()
    issuesInOrder.append(issue)
    issues[issue] = 0
nPolls = int(input())
for i in range(nPolls):
    for j in range(nIssues):
        issue, vote = input().split(' ')
        issues[issue] += 1 if vote == 'yes' else (-2 if vote == 'no' else 0)
for issue in issuesInOrder:
    print('{} {}'.format(issue, "yes" if issues[issue] > 0 else ("no" if issues[issue] < 0 else "abstain")))
