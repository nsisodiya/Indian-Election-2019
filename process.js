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
const dataProcessChains = [
    function AddMetaData(mainData) {
        mainData.metaData = {};
    },
    function convertStringsToNum(mainData) {
        //This function calculate who won in a particular constituency
        mainData.metaData.totalVotesCasted = 0;
        mainData.map(function(cData) {
            cData.allCandidateData.map(function(candidateData) {
                //candidateData.
                candidateData['EVM Votes'] = parseInt(
                    candidateData['EVM Votes'],
                    10
                );
                candidateData['Postal Votes'] = parseInt(
                    candidateData['Postal Votes'],
                    10
                );
                candidateData['Total Votes'] = parseInt(
                    candidateData['Total Votes'],
                    10
                );
                mainData.metaData.totalVotesCasted =
                    mainData.metaData.totalVotesCasted +
                    candidateData['Total Votes'];
            });
        });
    },
    function appendWinnerFlag(mainData) {
        //This function calculate who won in a particular constituency
        mainData.metaData.partyWiseData = {};
        mainData.map(function(cData) {
            var winnerIndex = util.findMaxInArrayOofObj(
                cData.allCandidateData,
                'Total Votes'
            );
            cData.Winner = cData.allCandidateData[winnerIndex];
            if (
                mainData.metaData.partyWiseData[cData.Winner.Party] ===
                undefined
            ) {
                mainData.metaData.partyWiseData[cData.Winner.Party] = {
                    count: 0
                };
            }
            mainData.metaData.partyWiseData[cData.Winner.Party].count =
                mainData.metaData.partyWiseData[cData.Winner.Party].count + 1;
            //cData.allCandidateData.map(function(candidateData) {});
        });
        mainData.metaData.partyData = util.SortArrayOfObject(
            Object.keys(mainData.metaData.partyWiseData).map(function(v) {
                return {
                    Party: v,
                    'Total Candidate Won':
                        mainData.metaData.partyWiseData[v].count
                };
            }),
            'Total Candidate Won'
        );
    },
    function ListAllParties(mainData) {
        //This will list out all the parties
        var allParties = {};
        mainData.map(function(cData) {
            cData.allCandidateData.map(function(candidateData) {
                allParties[candidateData.Party] = true;
            });
        });
        allParties = Object.keys(allParties).sort();
        console.log(allParties);
        mainData.metaData.allParties = allParties;
    }
];

function runDataProcessPipeLine(callback) {
    util.getJSONDataFromUrl('./Election2019Results.json', function(mainData) {
        dataProcessChains.forEach(function(fun) {
            fun(mainData);
        });
        //AllDataProcessing is over, now, we can create sections.
        console.log('mainData', mainData);
        generateAllSections(mainData);
    });
}

runDataProcessPipeLine();

const allSections = [
    function TotalVotesPartyWise(mainData) {
        var sectionTitle = 'Total Votes';
        var sectionData = [
            {
                'Total Votes Casted': mainData.metaData.totalVotesCasted
            }
        ];
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function TotalVotesPartyWise(mainData) {
        var sectionTitle = 'Parties wise Data';
        var sectionData = mainData.metaData.partyData;
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function Top50CandidateWithHighestVotes(mainData) {
        var sectionTitle = 'These 50 candidate got maximum votes in';
        var fullListOfAllCandidate = [];
        mainData.map(function(cData) {
            cData.allCandidateData.map(function(candidateData) {
                fullListOfAllCandidate.push({
                    Candidate: candidateData.Candidate,
                    Party: candidateData.Party,
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
    function ListAllWinners(mainData) {
        //This Section list out all winners.
        var sectionTitle = 'List of All Constituency and Winner Party';
        var sectionData = [];
        mainData.map(function(cData, i) {
            var winnerIndex = util.findMaxInArrayOofObj(
                cData.allCandidateData,
                'Total Votes'
            );
            cData.Winner = cData.allCandidateData[winnerIndex];
            sectionData.push({
                Index: i + 1,
                State: cData.stateName,
                Constituency: cData.name,
                'Winner Candidate': cData.Winner.Candidate,
                'Winner Party': cData.Winner.Party
            });
            //cData.allCandidateData.map(function(candidateData) {});
        });
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    },
    function ListTop10HightestVotes(mainData) {
        //This Section list out all winners.
        var sectionTitle = 'Top 10 candidates with hightest Votes';
        var sectionData = [{ name: 'nn' }, { name: 'pp' }];
        return {
            sectionTitle: sectionTitle,
            sectionData: sectionData
        };
    }
];
function generateAllSections(mainData) {
    allSections.forEach(function(sectionDataGenfun) {
        var sData = sectionDataGenfun(mainData);
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
