//alert('data');
//get JSON data
const util = {
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
    function convertStringsToNum(mainData) {
        //This function calculate who won in a particular constituency
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
            });
        });
    },
    function appendWinnerFlag(mainData) {
        //This function calculate who won in a particular constituency
        mainData.map(function(cData) {
            var winnerIndex = util.findMaxInArrayOofObj(
                cData.allCandidateData,
                'Total Votes'
            );
            cData.Winner = cData.allCandidateData[winnerIndex];
            //cData.allCandidateData.map(function(candidateData) {});
        });
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
function JsonDataToTable(data) {
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
                    return `<td>${rowData[key]}</td>`;
                })
                .join('')}</tr>`;
        })
        .join('')}
    </tbody>
    </table>`;
}

const allSections = [
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
    }
];
function generateAllSections(mainData) {
    allSections.forEach(function(sectionDataGenfun) {
        var sData = sectionDataGenfun(mainData);
        $('#sections').append(`
        <div class="section">
            <h1>${sData.sectionTitle}</h1>
            <div class="tableData">
                ${JsonDataToTable(sData.sectionData)}
            </div>
        </div>
        `);
    });
}
