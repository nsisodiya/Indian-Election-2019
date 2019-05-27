//alert('data');
//get JSON data
const util = {
    format: function name(num) {
        return num.toLocaleString('en-In');
    },
    stripArray: function name(arr, num) {
        return arr.filter(function(v, i) {
            return i < num;
        });
    },
    SortArrayOfObject: function(AoO, key) {
        return AoO.sort(function compare(b, a) {
            const genreA = a[key];
            const genreB = b[key];

            let comparison = 0;
            if (genreA > genreB) {
                comparison = 1;
            } else if (genreA < genreB) {
                comparison = -1;
            }
            return comparison;
        });
    },
    JsonDataToTable: function(data) {
        var headers = Object.keys(data[0]);
        return `<table class="table"><thead>
                <tr>
                ${headers
                    .map(function(key) {
                        return `<th>${key}</th>`;
                    })
                    .join('')}
                </tr>
            </thead>
            <tbody>${data
                .map(function(rowData) {
                    return `<tr>${headers
                        .map(function(key) {
                            return `<td>${(function(params) {
                                if (typeof rowData[key] === 'number') {
                                    return util.format(rowData[key]);
                                }
                                return rowData[key];
                            })()}</td>`;
                        })
                        .join('')}</tr>`;
                })
                .join('')}
            </tbody>
            </table>`;
    },
    getJSONDataFromUrl: function(url, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                callback(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    },
    findMaxInArrayOofObj: function(arr, key) {
        var maxCount = 0;
        var maxIndex = -1;
        arr.forEach(function(v, i) {
            if (v[key] > maxCount) {
                maxCount = v[key];
                maxIndex = i;
            }
        });
        return maxIndex;
    }
};
var metaData = {
    partyWiseData: {}
};

function processData(metaData) {
    //This function calculate who won in a particular constituency
    metaData.totalVotesCasted = 0;

    var allParties = {};
    metaData.constituencyData.map(function(cData) {
        cData.allCandidateData.map(function(candidateData) {
            candidateData['Total Votes'] = parseInt(
                candidateData['Total Votes'],
                10
            );
            allParties[candidateData.Party] = true;
            metaData.totalVotesCasted += candidateData['Total Votes'];
            if (metaData.partyWiseData[candidateData['Party']] === undefined) {
                metaData.partyWiseData[candidateData['Party']] = {
                    votes: 0,
                    TotalCandidates: 0,
                    'Winner Count': 0
                };
            }
            metaData.partyWiseData[candidateData['Party']].votes +=
                candidateData['Total Votes'];
            metaData.partyWiseData[candidateData['Party']][
                'TotalCandidates'
            ] += 1;
        });
        cData['Total Casted Votes'] = cData.allCandidateData
            .map(function(candidateData) {
                return candidateData['Total Votes'];
            })
            .reduce(function(a, b) {
                return a + b;
            }, 0);
        var winnerIndex = util.findMaxInArrayOofObj(
            cData.allCandidateData,
            'Total Votes'
        );
        cData.Winner = cData.allCandidateData[winnerIndex];
        cData.Margin = cData.allCandidateData
            .map(function(cand) {
                return cData.Winner['Total Votes'] - cand['Total Votes'];
            })
            .sort()[1];
        metaData.partyWiseData[cData.Winner.Party]['Winner Count'] += 1;
    });
    allParties = Object.keys(allParties).sort();
    metaData.allParties = allParties;
}

function runDataProcessPipeLine(callback) {
    util.getJSONDataFromUrl('./Election2019Results.json', function(
        constituencyData
    ) {
        metaData.constituencyData = constituencyData;
        processData(metaData);
        //AllDataProcessing is over, now, we can create sections.
        //loader
        $('#loader').remove();
        generateAllSections(metaData);
        console.log('metaData', metaData);
    });
}

runDataProcessPipeLine();

const allSections = [
    function TotalVotesPartyWise(metaData) {
        var sectionTitle = 'Total Votes';
        var sectionData = [
            {
                'Total Votes Casted': metaData.totalVotesCasted
            }
        ];
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function TotalVotesPartyWise(metaData) {
        var sectionTitle = 'Top 30 Parties with their Votes';
        var sectionData = util.stripArray(
            util.SortArrayOfObject(
                Object.keys(metaData.partyWiseData).map(function(v) {
                    var tcw = metaData.partyWiseData[v]['Winner Count'];
                    if (tcw === undefined) {
                        tcw = 0;
                    }
                    return {
                        Party: v,
                        Votes: metaData.partyWiseData[v].votes,
                        'Total Candidate by Party':
                            metaData.partyWiseData[v]['TotalCandidates'],
                        'Total Candidate Won': tcw,
                        Percentage:
                            (tcw /
                                metaData.partyWiseData[v]['TotalCandidates']) *
                            100
                    };
                }),
                'Votes'
            ),
            30
        );
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function TotalVotesPartyWise(metaData) {
        var sectionTitle = 'Parties wise Data';
        var sectionData = util.SortArrayOfObject(
            Object.keys(metaData.partyWiseData)
                .map(function(v) {
                    return {
                        Party: v,
                        'Total Candidate Won':
                            metaData.partyWiseData[v]['Winner Count']
                    };
                })
                .filter(function(v) {
                    return v['Total Candidate Won'] > 0;
                }),
            'Total Candidate Won'
        );
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function Top50WithHighestMargin(metaData) {
        var sectionTitle = 'Top 50 Candidate who won with High margin';
        var listOfWinners = [];
        metaData.constituencyData.map(function(cData) {
            listOfWinners.push({
                'Winner Candidate': cData.Winner.Candidate,
                'Winner Party': cData.Winner.Party,
                State: cData.stateName,
                Constituency: cData.name,
                Margin: cData.Margin
            });
        });

        var sectionData = util.stripArray(
            util.SortArrayOfObject(listOfWinners, 'Margin'),
            50
        );
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function Top50WithLeastMargin(metaData) {
        var sectionTitle = 'Top 50 Candidate who won with Least margin';
        var listOfWinners = [];
        metaData.constituencyData.map(function(cData) {
            listOfWinners.push({
                'Winner Candidate': cData.Winner.Candidate,
                'Winner Party': cData.Winner.Party,
                State: cData.stateName,
                Constituency: cData.name,
                Margin: cData.Margin
            });
        });

        var sectionData = util.stripArray(
            util.SortArrayOfObject(listOfWinners, 'Margin').reverse(),
            50
        );
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function Top50CandidateWithHighestVotes(metaData) {
        var sectionTitle = 'These 50 candidate got maximum votes in';
        var fullListOfAllCandidate = [];
        metaData.constituencyData.map(function(cData) {
            cData.allCandidateData.map(function(candidateData) {
                fullListOfAllCandidate.push({
                    Candidate: candidateData.Candidate,
                    Party: candidateData.Party,
                    State: cData.stateName,
                    Constituency: cData.name,
                    'Total Votes': candidateData['Total Votes']
                });
            });
        });

        var sectionData = util.stripArray(
            util.SortArrayOfObject(fullListOfAllCandidate, 'Total Votes'),
            50
        );
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function Top50CandidateWithLowestVotes(metaData) {
        var sectionTitle = 'These 50 candidate got least votes';
        var fullListOfAllCandidate = [];
        metaData.constituencyData.map(function(cData) {
            cData.allCandidateData.map(function(candidateData) {
                fullListOfAllCandidate.push({
                    Candidate: candidateData.Candidate,
                    Party: candidateData.Party,
                    State: cData.stateName,
                    Constituency: cData.name,
                    'Total Votes': candidateData['Total Votes']
                });
            });
        });

        var sectionData = util.stripArray(
            util
                .SortArrayOfObject(fullListOfAllCandidate, 'Total Votes')
                .reverse(),
            50
        );
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function ListAllWinners(metaData) {
        //This Section list out all winners.
        var sectionTitle = 'List of All Constituency and Winner Party';
        var sectionData = [];
        var totalVotersOfWinner = 0;
        var totalCastedVotes = 0;
        metaData.constituencyData.map(function(cData, i) {
            var winnerIndex = util.findMaxInArrayOofObj(
                cData.allCandidateData,
                'Total Votes'
            );
            cData.Winner = cData.allCandidateData[winnerIndex];
            totalVotersOfWinner += cData.Winner['Total Votes'];
            totalCastedVotes += cData['Total Casted Votes'];
            sectionData.push({
                Index: i + 1,
                State: cData.stateName,
                Constituency: cData.name,
                'Total Candidates': cData.allCandidateData.length - 1, //Removed NOTA
                'Winner Candidate': cData.Winner.Candidate,
                'Winner Party': cData.Winner.Party,
                'Total Casted Votes': cData['Total Casted Votes'],
                Margin: cData.Margin,
                'Winner Votes': cData.Winner['Total Votes'],

                'Voter Percentage of Winner':
                    (cData.Winner['Total Votes'] /
                        cData['Total Casted Votes']) *
                    100,
                'Margin Percentage':
                    (cData.Margin / cData['Total Casted Votes']) * 100
            });
        });
        sectionData.push({
            Index: 'Total',
            State: '-',
            Constituency: '-',
            'Total Candidates': '-',
            'Winner Candidate': '-',
            'Winner Party': '-',
            'Margin Percentage': '-',
            'Voter Percentage of Winner': '-',
            'Winner Votes': totalVotersOfWinner,
            Margin: '-',
            'Total Casted Votes': totalCastedVotes
        });
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    }
];
function generateAllSections(metaData) {
    allSections.forEach(function(sectionDataGenfun) {
        var sData = sectionDataGenfun(metaData);
        $('#sections').append(`
        <div class="section">
            <h1>${sData.sectionTitle}</h1>
            <div class="tableData">
                ${util.JsonDataToTable(sData.sectionData)}
            </div>
        </div>
        `);
    });
}
