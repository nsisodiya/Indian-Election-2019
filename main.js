const rp = require('request-promise');
const $ = require('cheerio');
var fs = require('fs');

function getConuntryData() {
    var conuntryData = [
        {
            stateCode: 'U01',
            stateName: 'Andaman & Nicobar Islands',
            constituencies: [
                {
                    name: 'Andaman & Nicobar Islands',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S01',
            stateName: 'Andhra Pradesh',
            constituencies: [
                {
                    name: 'Amalapuram ',
                    id: '7'
                },
                {
                    name: 'Anakapalli',
                    id: '5'
                },
                {
                    name: 'Anantapur',
                    id: '19'
                },
                {
                    name: 'Aruku ',
                    id: '1'
                },
                {
                    name: 'Bapatla ',
                    id: '15'
                },
                {
                    name: 'Chittoor ',
                    id: '25'
                },
                {
                    name: 'Eluru ',
                    id: '10'
                },
                {
                    name: 'Guntur',
                    id: '13'
                },
                {
                    name: 'Hindupur',
                    id: '20'
                },
                {
                    name: 'Kadapa',
                    id: '21'
                },
                {
                    name: 'Kakinada',
                    id: '6'
                },
                {
                    name: 'Kurnool',
                    id: '18'
                },
                {
                    name: 'Machilipatnam ',
                    id: '11'
                },
                {
                    name: 'Nandyal',
                    id: '17'
                },
                {
                    name: 'Narasaraopet',
                    id: '14'
                },
                {
                    name: 'Narsapuram',
                    id: '9'
                },
                {
                    name: 'Nellore',
                    id: '22'
                },
                {
                    name: 'Ongole ',
                    id: '16'
                },
                {
                    name: 'Rajahmundry',
                    id: '8'
                },
                {
                    name: 'Rajampet',
                    id: '24'
                },
                {
                    name: 'Srikakulam',
                    id: '2'
                },
                {
                    name: 'Tirupati ',
                    id: '23'
                },
                {
                    name: 'Vijayawada',
                    id: '12'
                },
                {
                    name: 'Visakhapatnam',
                    id: '4'
                },
                {
                    name: 'Vizianagaram',
                    id: '3'
                }
            ]
        },
        {
            stateCode: 'S02',
            stateName: 'Arunachal Pradesh',
            constituencies: [
                {
                    name: 'ARUNACHAL EAST',
                    id: '2'
                },
                {
                    name: 'ARUNACHAL WEST',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S03',
            stateName: 'Assam',
            constituencies: [
                {
                    name: 'Autonomous District',
                    id: '3'
                },
                {
                    name: 'Barpeta',
                    id: '6'
                },
                {
                    name: 'Dhubri',
                    id: '4'
                },
                {
                    name: 'Dibrugarh',
                    id: '13'
                },
                {
                    name: 'Gauhati',
                    id: '7'
                },
                {
                    name: 'Jorhat',
                    id: '12'
                },
                {
                    name: 'Kaliabor',
                    id: '11'
                },
                {
                    name: 'Karimganj ',
                    id: '1'
                },
                {
                    name: 'Kokrajhar',
                    id: '5'
                },
                {
                    name: 'Lakhimpur',
                    id: '14'
                },
                {
                    name: 'Mangaldoi',
                    id: '8'
                },
                {
                    name: 'Nowgong',
                    id: '10'
                },
                {
                    name: 'Silchar',
                    id: '2'
                },
                {
                    name: 'Tezpur',
                    id: '9'
                }
            ]
        },
        {
            stateCode: 'S04',
            stateName: 'Bihar',
            constituencies: [
                {
                    name: 'Araria',
                    id: '9'
                },
                {
                    name: 'Arrah',
                    id: '32'
                },
                {
                    name: 'Aurangabad',
                    id: '37'
                },
                {
                    name: 'Banka',
                    id: '27'
                },
                {
                    name: 'Begusarai',
                    id: '24'
                },
                {
                    name: 'Bhagalpur',
                    id: '26'
                },
                {
                    name: 'Buxar',
                    id: '33'
                },
                {
                    name: 'Darbhanga',
                    id: '14'
                },
                {
                    name: 'Gaya (SC)',
                    id: '38'
                },
                {
                    name: 'Gopalganj (SC)',
                    id: '17'
                },
                {
                    name: 'Hajipur (SC)',
                    id: '21'
                },
                {
                    name: 'Jahanabad',
                    id: '36'
                },
                {
                    name: 'Jamui (SC)',
                    id: '40'
                },
                {
                    name: 'Jhanjharpur',
                    id: '7'
                },
                {
                    name: 'Karakat',
                    id: '35'
                },
                {
                    name: 'Katihar',
                    id: '11'
                },
                {
                    name: 'Khagaria',
                    id: '25'
                },
                {
                    name: 'Kishanganj',
                    id: '10'
                },
                {
                    name: 'Madhepura',
                    id: '13'
                },
                {
                    name: 'Madhubani',
                    id: '6'
                },
                {
                    name: 'Maharajganj',
                    id: '19'
                },
                {
                    name: 'Munger',
                    id: '28'
                },
                {
                    name: 'Muzaffarpur',
                    id: '15'
                },
                {
                    name: 'Nalanda',
                    id: '29'
                },
                {
                    name: 'Nawada',
                    id: '39'
                },
                {
                    name: 'Paschim Champaran',
                    id: '2'
                },
                {
                    name: 'Pataliputra',
                    id: '31'
                },
                {
                    name: 'Patna Sahib',
                    id: '30'
                },
                {
                    name: 'Purnia',
                    id: '12'
                },
                {
                    name: 'Purvi Champaran',
                    id: '3'
                },
                {
                    name: 'Samastipur (SC)',
                    id: '23'
                },
                {
                    name: 'Saran',
                    id: '20'
                },
                {
                    name: 'Sasaram (SC)',
                    id: '34'
                },
                {
                    name: 'Sheohar',
                    id: '4'
                },
                {
                    name: 'Sitamarhi',
                    id: '5'
                },
                {
                    name: 'Siwan',
                    id: '18'
                },
                {
                    name: 'Supaul',
                    id: '8'
                },
                {
                    name: 'Ujiarpur',
                    id: '22'
                },
                {
                    name: 'Vaishali',
                    id: '16'
                },
                {
                    name: 'Valmiki Nagar',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'U02',
            stateName: 'Chandigarh',
            constituencies: [
                {
                    name: 'CHANDIGARH',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S26',
            stateName: 'Chhattisgarh',
            constituencies: [
                {
                    name: 'BASTAR',
                    id: '10'
                },
                {
                    name: 'BILASPUR',
                    id: '5'
                },
                {
                    name: 'DURG',
                    id: '7'
                },
                {
                    name: 'JANJGIR-CHAMPA',
                    id: '3'
                },
                {
                    name: 'KANKER',
                    id: '11'
                },
                {
                    name: 'KORBA',
                    id: '4'
                },
                {
                    name: 'MAHASAMUND',
                    id: '9'
                },
                {
                    name: 'RAIGARH',
                    id: '2'
                },
                {
                    name: 'RAIPUR',
                    id: '8'
                },
                {
                    name: 'RAJNANDGAON',
                    id: '6'
                },
                {
                    name: 'SARGUJA',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'U03',
            stateName: 'Dadra & Nagar Haveli',
            constituencies: [
                {
                    name: 'Dadra And Nagar Haveli',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'U04',
            stateName: 'Daman & Diu',
            constituencies: [
                {
                    name: 'Daman & diu',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S05',
            stateName: 'Goa',
            constituencies: [
                {
                    name: 'North Goa',
                    id: '1'
                },
                {
                    name: 'South Goa',
                    id: '2'
                }
            ]
        },
        {
            stateCode: 'S06',
            stateName: 'Gujarat',
            constituencies: [
                {
                    name: 'Ahmedabad East',
                    id: '7'
                },
                {
                    name: 'Ahmedabad West',
                    id: '8'
                },
                {
                    name: 'Amreli',
                    id: '14'
                },
                {
                    name: 'Anand',
                    id: '16'
                },
                {
                    name: 'Banaskantha',
                    id: '2'
                },
                {
                    name: 'Bardoli',
                    id: '23'
                },
                {
                    name: 'Bharuch',
                    id: '22'
                },
                {
                    name: 'Bhavnagar',
                    id: '15'
                },
                {
                    name: 'Chhota Udaipur',
                    id: '21'
                },
                {
                    name: 'Dahod',
                    id: '19'
                },
                {
                    name: 'Gandhinagar',
                    id: '6'
                },
                {
                    name: 'Jamnagar',
                    id: '12'
                },
                {
                    name: 'Junagadh',
                    id: '13'
                },
                {
                    name: 'Kachchh',
                    id: '1'
                },
                {
                    name: 'Kheda',
                    id: '17'
                },
                {
                    name: 'Mahesana',
                    id: '4'
                },
                {
                    name: 'Navsari',
                    id: '25'
                },
                {
                    name: 'Panchmahal',
                    id: '18'
                },
                {
                    name: 'Patan',
                    id: '3'
                },
                {
                    name: 'Porbandar',
                    id: '11'
                },
                {
                    name: 'Rajkot',
                    id: '10'
                },
                {
                    name: 'Sabarkantha',
                    id: '5'
                },
                {
                    name: 'Surat',
                    id: '24'
                },
                {
                    name: 'Surendranagar',
                    id: '9'
                },
                {
                    name: 'Vadodara',
                    id: '20'
                },
                {
                    name: 'Valsad',
                    id: '26'
                }
            ]
        },
        {
            stateCode: 'S07',
            stateName: 'Haryana',
            constituencies: [
                {
                    name: 'Ambala',
                    id: '1'
                },
                {
                    name: 'Bhiwani-Mahendragarh',
                    id: '8'
                },
                {
                    name: 'Faridabad',
                    id: '10'
                },
                {
                    name: 'Gurgaon',
                    id: '9'
                },
                {
                    name: 'Hisar',
                    id: '4'
                },
                {
                    name: 'Karnal',
                    id: '5'
                },
                {
                    name: 'Kurukshetra',
                    id: '2'
                },
                {
                    name: 'Rohtak',
                    id: '7'
                },
                {
                    name: 'Sirsa',
                    id: '3'
                },
                {
                    name: 'Sonipat',
                    id: '6'
                }
            ]
        },
        {
            stateCode: 'S08',
            stateName: 'Himachal Pradesh',
            constituencies: [
                {
                    name: 'Hamirpur',
                    id: '3'
                },
                {
                    name: 'Kangra',
                    id: '1'
                },
                {
                    name: 'Mandi',
                    id: '2'
                },
                {
                    name: 'Shimla',
                    id: '4'
                }
            ]
        },
        {
            stateCode: 'S09',
            stateName: 'Jammu & Kashmir',
            constituencies: [
                {
                    name: 'Anantnag',
                    id: '3'
                },
                {
                    name: 'Baramulla',
                    id: '1'
                },
                {
                    name: 'Jammu',
                    id: '6'
                },
                {
                    name: 'Ladakh',
                    id: '4'
                },
                {
                    name: 'Srinagar',
                    id: '2'
                },
                {
                    name: 'Udhampur',
                    id: '5'
                }
            ]
        },
        {
            stateCode: 'S27',
            stateName: 'Jharkhand',
            constituencies: [
                {
                    name: 'Chatra',
                    id: '4'
                },
                {
                    name: 'Dhanbad',
                    id: '7'
                },
                {
                    name: 'Dumka',
                    id: '2'
                },
                {
                    name: 'Giridih',
                    id: '6'
                },
                {
                    name: 'Godda',
                    id: '3'
                },
                {
                    name: 'Hazaribagh',
                    id: '14'
                },
                {
                    name: 'Jamshedpur',
                    id: '9'
                },
                {
                    name: 'Khunti',
                    id: '11'
                },
                {
                    name: 'Kodarma',
                    id: '5'
                },
                {
                    name: 'Lohardaga',
                    id: '12'
                },
                {
                    name: 'Palamau',
                    id: '13'
                },
                {
                    name: 'Rajmahal',
                    id: '1'
                },
                {
                    name: 'Ranchi',
                    id: '8'
                },
                {
                    name: 'Singhbhum',
                    id: '10'
                }
            ]
        },
        {
            stateCode: 'S10',
            stateName: 'Karnataka',
            constituencies: [
                {
                    name: 'Bagalkot',
                    id: '3'
                },
                {
                    name: 'Bangalore central',
                    id: '25'
                },
                {
                    name: 'Bangalore North',
                    id: '24'
                },
                {
                    name: 'Bangalore Rural',
                    id: '23'
                },
                {
                    name: 'Bangalore South',
                    id: '26'
                },
                {
                    name: 'Belgaum',
                    id: '2'
                },
                {
                    name: 'Bellary',
                    id: '9'
                },
                {
                    name: 'Bidar',
                    id: '7'
                },
                {
                    name: 'Bijapur',
                    id: '4'
                },
                {
                    name: 'Chamarajanagar',
                    id: '22'
                },
                {
                    name: 'Chikkballapur',
                    id: '27'
                },
                {
                    name: 'Chikkodi',
                    id: '1'
                },
                {
                    name: 'Chitradurga',
                    id: '18'
                },
                {
                    name: 'Dakshina Kannada',
                    id: '17'
                },
                {
                    name: 'Davanagere',
                    id: '13'
                },
                {
                    name: 'Dharwad',
                    id: '11'
                },
                {
                    name: 'Gulbarga',
                    id: '5'
                },
                {
                    name: 'Hassan',
                    id: '16'
                },
                {
                    name: 'Haveri',
                    id: '10'
                },
                {
                    name: 'Kolar',
                    id: '28'
                },
                {
                    name: 'Koppal',
                    id: '8'
                },
                {
                    name: 'Mandya',
                    id: '20'
                },
                {
                    name: 'Mysore',
                    id: '21'
                },
                {
                    name: 'Raichur',
                    id: '6'
                },
                {
                    name: 'Shimoga',
                    id: '14'
                },
                {
                    name: 'Tumkur',
                    id: '19'
                },
                {
                    name: 'Udupi Chikmagalur',
                    id: '15'
                },
                {
                    name: 'Uttara Kannada',
                    id: '12'
                }
            ]
        },
        {
            stateCode: 'S11',
            stateName: 'Kerala',
            constituencies: [
                {
                    name: 'Alappuzha',
                    id: '15'
                },
                {
                    name: 'Alathur ',
                    id: '9'
                },
                {
                    name: 'Attingal',
                    id: '19'
                },
                {
                    name: 'Chalakudy',
                    id: '11'
                },
                {
                    name: 'Ernakulam',
                    id: '12'
                },
                {
                    name: 'Idukki',
                    id: '13'
                },
                {
                    name: 'Kannur',
                    id: '2'
                },
                {
                    name: 'Kasaragod',
                    id: '1'
                },
                {
                    name: 'Kollam',
                    id: '18'
                },
                {
                    name: 'Kottayam',
                    id: '14'
                },
                {
                    name: 'Kozhikode',
                    id: '5'
                },
                {
                    name: 'Malappuram',
                    id: '6'
                },
                {
                    name: 'Mavelikkara ',
                    id: '16'
                },
                {
                    name: 'Palakkad',
                    id: '8'
                },
                {
                    name: 'Pathanamthitta',
                    id: '17'
                },
                {
                    name: 'Ponnani',
                    id: '7'
                },
                {
                    name: 'Thiruvananthapuram',
                    id: '20'
                },
                {
                    name: 'Thrissur',
                    id: '10'
                },
                {
                    name: 'Vadakara',
                    id: '3'
                },
                {
                    name: 'Wayanad',
                    id: '4'
                }
            ]
        },
        {
            stateCode: 'U06',
            stateName: 'Lakshadweep',
            constituencies: [
                {
                    name: 'Lakshadweep',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S12',
            stateName: 'Madhya Pradesh',
            constituencies: [
                {
                    name: 'BALAGHAT',
                    id: '15'
                },
                {
                    name: 'BETUL',
                    id: '29'
                },
                {
                    name: 'BHIND',
                    id: '2'
                },
                {
                    name: 'BHOPAL',
                    id: '19'
                },
                {
                    name: 'CHHINDWARA',
                    id: '16'
                },
                {
                    name: 'DAMOH',
                    id: '7'
                },
                {
                    name: 'DEWAS',
                    id: '21'
                },
                {
                    name: 'DHAR',
                    id: '25'
                },
                {
                    name: 'GUNA',
                    id: '4'
                },
                {
                    name: 'GWALIOR',
                    id: '3'
                },
                {
                    name: 'HOSHANGABAD',
                    id: '17'
                },
                {
                    name: 'INDORE',
                    id: '26'
                },
                {
                    name: 'JABALPUR',
                    id: '13'
                },
                {
                    name: 'KHAJURAHO',
                    id: '8'
                },
                {
                    name: 'KHANDWA',
                    id: '28'
                },
                {
                    name: 'KHARGONE',
                    id: '27'
                },
                {
                    name: 'MANDLA',
                    id: '14'
                },
                {
                    name: 'MANDSOUR',
                    id: '23'
                },
                {
                    name: 'MORENA',
                    id: '1'
                },
                {
                    name: 'RAJGARH',
                    id: '20'
                },
                {
                    name: 'RATLAM',
                    id: '24'
                },
                {
                    name: 'REWA',
                    id: '10'
                },
                {
                    name: 'SAGAR',
                    id: '5'
                },
                {
                    name: 'SATNA',
                    id: '9'
                },
                {
                    name: 'SHAHDOL',
                    id: '12'
                },
                {
                    name: 'SIDHI',
                    id: '11'
                },
                {
                    name: 'TIKAMGARH',
                    id: '6'
                },
                {
                    name: 'UJJAIN',
                    id: '22'
                },
                {
                    name: 'VIDISHA',
                    id: '18'
                }
            ]
        },
        {
            stateCode: 'S13',
            stateName: 'Maharashtra',
            constituencies: [
                {
                    name: 'Ahmadnagar ',
                    id: '37'
                },
                {
                    name: 'Akola',
                    id: '6'
                },
                {
                    name: 'Amravati ',
                    id: '7'
                },
                {
                    name: 'Aurangabad',
                    id: '19'
                },
                {
                    name: 'Baramati',
                    id: '35'
                },
                {
                    name: 'Beed',
                    id: '39'
                },
                {
                    name: 'Bhandara - gondiya',
                    id: '11'
                },
                {
                    name: 'Bhiwandi',
                    id: '23'
                },
                {
                    name: 'Buldhana',
                    id: '5'
                },
                {
                    name: 'Chandrapur',
                    id: '13'
                },
                {
                    name: 'Dhule',
                    id: '2'
                },
                {
                    name: 'Dindori ',
                    id: '20'
                },
                {
                    name: 'Gadchiroli-Chimur',
                    id: '12'
                },
                {
                    name: 'Hatkanangle',
                    id: '48'
                },
                {
                    name: 'Hingoli ',
                    id: '15'
                },
                {
                    name: 'Jalgaon',
                    id: '3'
                },
                {
                    name: 'Jalna',
                    id: '18'
                },
                {
                    name: 'Kalyan',
                    id: '24'
                },
                {
                    name: 'Kolhapur',
                    id: '47'
                },
                {
                    name: 'Latur ',
                    id: '41'
                },
                {
                    name: 'Madha',
                    id: '43'
                },
                {
                    name: 'Maval',
                    id: '33'
                },
                {
                    name: 'Mumbai   South',
                    id: '31'
                },
                {
                    name: 'Mumbai North',
                    id: '26'
                },
                {
                    name: 'Mumbai North central',
                    id: '29'
                },
                {
                    name: 'Mumbai North East',
                    id: '28'
                },
                {
                    name: 'Mumbai North West',
                    id: '27'
                },
                {
                    name: 'Mumbai South central',
                    id: '30'
                },
                {
                    name: 'Nagpur ',
                    id: '10'
                },
                {
                    name: 'Nanded',
                    id: '16'
                },
                {
                    name: 'Nandurbar ',
                    id: '1'
                },
                {
                    name: 'Nashik',
                    id: '21'
                },
                {
                    name: 'Osmanabad',
                    id: '40'
                },
                {
                    name: 'Palghar ',
                    id: '22'
                },
                {
                    name: 'Parbhani',
                    id: '17'
                },
                {
                    name: 'Pune',
                    id: '34'
                },
                {
                    name: 'Raigad',
                    id: '32'
                },
                {
                    name: 'Ramtek ',
                    id: '9'
                },
                {
                    name: 'Ratnagiri - sindhudurg',
                    id: '46'
                },
                {
                    name: 'Raver',
                    id: '4'
                },
                {
                    name: 'Sangli',
                    id: '44'
                },
                {
                    name: 'Satara',
                    id: '45'
                },
                {
                    name: 'Shirdi',
                    id: '38'
                },
                {
                    name: 'Shirur',
                    id: '36'
                },
                {
                    name: 'Solapur ',
                    id: '42'
                },
                {
                    name: 'Thane',
                    id: '25'
                },
                {
                    name: 'Wardha',
                    id: '8'
                },
                {
                    name: 'Yavatmal-Washim',
                    id: '14'
                }
            ]
        },
        {
            stateCode: 'S14',
            stateName: 'Manipur',
            constituencies: [
                {
                    name: 'Inner manipur',
                    id: '1'
                },
                {
                    name: 'Outer manipur',
                    id: '2'
                }
            ]
        },
        {
            stateCode: 'S15',
            stateName: 'Meghalaya',
            constituencies: [
                {
                    name: 'Shillong',
                    id: '1'
                },
                {
                    name: 'Tura ',
                    id: '2'
                }
            ]
        },
        {
            stateCode: 'S16',
            stateName: 'Mizoram',
            constituencies: [
                {
                    name: 'MIZORAM',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S17',
            stateName: 'Nagaland',
            constituencies: [
                {
                    name: 'Nagaland',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'U05',
            stateName: 'NCT OF Delhi',
            constituencies: [
                {
                    name: 'CHANDNI CHOWK                 ',
                    id: '1'
                },
                {
                    name: 'EAST DELHI                    ',
                    id: '3'
                },
                {
                    name: 'NEW DELHI                     ',
                    id: '4'
                },
                {
                    name: 'NORTH EAST DELHI              ',
                    id: '2'
                },
                {
                    name: 'NORTH WEST DELHI              ',
                    id: '5'
                },
                {
                    name: 'SOUTH DELHI                   ',
                    id: '7'
                },
                {
                    name: 'WEST DELHI                    ',
                    id: '6'
                }
            ]
        },
        {
            stateCode: 'S18',
            stateName: 'Odisha',
            constituencies: [
                {
                    name: 'Aska',
                    id: '19'
                },
                {
                    name: 'Balasore',
                    id: '6'
                },
                {
                    name: 'Bargarh',
                    id: '1'
                },
                {
                    name: 'Berhampur',
                    id: '20'
                },
                {
                    name: 'Bhadrak ',
                    id: '7'
                },
                {
                    name: 'Bhubaneswar',
                    id: '18'
                },
                {
                    name: 'Bolangir',
                    id: '10'
                },
                {
                    name: 'Cuttack',
                    id: '14'
                },
                {
                    name: 'Dhenkanal',
                    id: '9'
                },
                {
                    name: 'Jagatsinghpur ',
                    id: '16'
                },
                {
                    name: 'Jajpur ',
                    id: '8'
                },
                {
                    name: 'Kalahandi',
                    id: '11'
                },
                {
                    name: 'Kandhamal',
                    id: '13'
                },
                {
                    name: 'Kendrapara ',
                    id: '15'
                },
                {
                    name: 'Keonjhar ',
                    id: '4'
                },
                {
                    name: 'Koraput ',
                    id: '21'
                },
                {
                    name: 'Mayurbhanj ',
                    id: '5'
                },
                {
                    name: 'Nabarangpur ',
                    id: '12'
                },
                {
                    name: 'Puri',
                    id: '17'
                },
                {
                    name: 'Sambalpur',
                    id: '3'
                },
                {
                    name: 'Sundargarh ',
                    id: '2'
                }
            ]
        },
        {
            stateCode: 'U07',
            stateName: 'Puducherry',
            constituencies: [
                {
                    name: 'Puducherry',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S19',
            stateName: 'Punjab',
            constituencies: [
                {
                    name: 'Amritsar',
                    id: '2'
                },
                {
                    name: 'Anandpur Sahib',
                    id: '6'
                },
                {
                    name: 'Bathinda',
                    id: '11'
                },
                {
                    name: 'Faridkot',
                    id: '9'
                },
                {
                    name: 'Fatehgarh Sahib',
                    id: '8'
                },
                {
                    name: 'Firozpur',
                    id: '10'
                },
                {
                    name: 'Gurdaspur',
                    id: '1'
                },
                {
                    name: 'Hoshiarpur',
                    id: '5'
                },
                {
                    name: 'Jalandhar',
                    id: '4'
                },
                {
                    name: 'Khadoor Sahib',
                    id: '3'
                },
                {
                    name: 'Ludhiana',
                    id: '7'
                },
                {
                    name: 'Patiala',
                    id: '13'
                },
                {
                    name: 'Sangrur',
                    id: '12'
                }
            ]
        },
        {
            stateCode: 'S20',
            stateName: 'Rajasthan',
            constituencies: [
                {
                    name: 'Ajmer',
                    id: '13'
                },
                {
                    name: 'Alwar',
                    id: '8'
                },
                {
                    name: 'Banswara',
                    id: '20'
                },
                {
                    name: 'Barmer',
                    id: '17'
                },
                {
                    name: 'BHARATPUR',
                    id: '9'
                },
                {
                    name: 'Bhilwara',
                    id: '23'
                },
                {
                    name: 'Bikaner (SC)',
                    id: '2'
                },
                {
                    name: 'Chittorgarh',
                    id: '21'
                },
                {
                    name: 'Churu',
                    id: '3'
                },
                {
                    name: 'Dausa',
                    id: '11'
                },
                {
                    name: 'Ganganagar',
                    id: '1'
                },
                {
                    name: 'Jaipur',
                    id: '7'
                },
                {
                    name: 'Jaipur Rural',
                    id: '6'
                },
                {
                    name: 'Jalore',
                    id: '18'
                },
                {
                    name: 'JHALAWAR-BARAN',
                    id: '25'
                },
                {
                    name: 'Jhunjhunu',
                    id: '4'
                },
                {
                    name: 'Jodhpur',
                    id: '16'
                },
                {
                    name: 'KARAULI-DHOLPUR',
                    id: '10'
                },
                {
                    name: 'Kota',
                    id: '24'
                },
                {
                    name: 'Nagaur',
                    id: '14'
                },
                {
                    name: 'Pali',
                    id: '15'
                },
                {
                    name: 'Rajsamand',
                    id: '22'
                },
                {
                    name: 'Sikar',
                    id: '5'
                },
                {
                    name: 'TONK-SAWAI MADHOPUR',
                    id: '12'
                },
                {
                    name: 'Udaipur',
                    id: '19'
                }
            ]
        },
        {
            stateCode: 'S21',
            stateName: 'Sikkim',
            constituencies: [
                {
                    name: 'Sikkim',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S22',
            stateName: 'Tamil Nadu',
            constituencies: [
                {
                    name: 'Arakkonam',
                    id: '7'
                },
                {
                    name: 'Arani',
                    id: '12'
                },
                {
                    name: 'Chennai central',
                    id: '4'
                },
                {
                    name: 'Chennai North',
                    id: '2'
                },
                {
                    name: 'Chennai South',
                    id: '3'
                },
                {
                    name: 'Chidambaram ',
                    id: '27'
                },
                {
                    name: 'Coimbatore',
                    id: '20'
                },
                {
                    name: 'Cuddalore ',
                    id: '26'
                },
                {
                    name: 'Dharmapuri',
                    id: '10'
                },
                {
                    name: 'Dindigul',
                    id: '22'
                },
                {
                    name: 'Erode',
                    id: '17'
                },
                {
                    name: 'Kallakurichi',
                    id: '14'
                },
                {
                    name: 'Kancheepuram ',
                    id: '6'
                },
                {
                    name: 'Kanniyakumari',
                    id: '39'
                },
                {
                    name: 'Karur',
                    id: '23'
                },
                {
                    name: 'Krishnagiri',
                    id: '9'
                },
                {
                    name: 'Madurai',
                    id: '32'
                },
                {
                    name: 'Mayiladuthurai',
                    id: '28'
                },
                {
                    name: 'Nagapattinam ',
                    id: '29'
                },
                {
                    name: 'Namakkal',
                    id: '16'
                },
                {
                    name: 'Nilgiris ',
                    id: '19'
                },
                {
                    name: 'Perambalur',
                    id: '25'
                },
                {
                    name: 'Pollachi',
                    id: '21'
                },
                {
                    name: 'Ramanathapuram',
                    id: '35'
                },
                {
                    name: 'Salem',
                    id: '15'
                },
                {
                    name: 'Sivaganga',
                    id: '31'
                },
                {
                    name: 'Sriperumbudur',
                    id: '5'
                },
                {
                    name: 'Tenkasi ',
                    id: '37'
                },
                {
                    name: 'Thanjavur',
                    id: '30'
                },
                {
                    name: 'Theni ',
                    id: '33'
                },
                {
                    name: 'Thiruvallur ',
                    id: '1'
                },
                {
                    name: 'Thoothukkudi',
                    id: '36'
                },
                {
                    name: 'Tiruchirappalli',
                    id: '24'
                },
                {
                    name: 'Tirunelveli',
                    id: '38'
                },
                {
                    name: 'Tiruppur',
                    id: '18'
                },
                {
                    name: 'Tiruvannamalai',
                    id: '11'
                },
                {
                    name: 'Viluppuram',
                    id: '13'
                },
                {
                    name: 'Virudhunagar',
                    id: '34'
                }
            ]
        },
        {
            stateCode: 'S29',
            stateName: 'Telangana',
            constituencies: [
                {
                    name: 'Adilabad ',
                    id: '1'
                },
                {
                    name: 'Bhongir ',
                    id: '14'
                },
                {
                    name: 'CHEVELLA',
                    id: '10'
                },
                {
                    name: 'Hyderabad',
                    id: '9'
                },
                {
                    name: 'Karimnagar ',
                    id: '3'
                },
                {
                    name: 'Khammam ',
                    id: '17'
                },
                {
                    name: 'Mahabubabad  ',
                    id: '16'
                },
                {
                    name: 'Mahbubnagar',
                    id: '11'
                },
                {
                    name: 'Malkajgiri',
                    id: '7'
                },
                {
                    name: 'Medak',
                    id: '6'
                },
                {
                    name: 'Nagarkurnool',
                    id: '12'
                },
                {
                    name: 'Nalgonda',
                    id: '13'
                },
                {
                    name: 'Nizamabad',
                    id: '4'
                },
                {
                    name: 'Peddapalle ',
                    id: '2'
                },
                {
                    name: 'Secundrabad',
                    id: '8'
                },
                {
                    name: 'Warangal',
                    id: '15'
                },
                {
                    name: 'Zahirabad',
                    id: '5'
                }
            ]
        },
        {
            stateCode: 'S23',
            stateName: 'Tripura',
            constituencies: [
                {
                    name: 'Tripura East',
                    id: '2'
                },
                {
                    name: 'Tripura West',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S24',
            stateName: 'Uttar Pradesh',
            constituencies: [
                {
                    name: 'Agra',
                    id: '18'
                },
                {
                    name: 'Akbarpur',
                    id: '44'
                },
                {
                    name: 'Aligarh',
                    id: '15'
                },
                {
                    name: 'Allahabad',
                    id: '52'
                },
                {
                    name: 'Ambedkar Nagar',
                    id: '55'
                },
                {
                    name: 'Amethi',
                    id: '37'
                },
                {
                    name: 'Amroha',
                    id: '9'
                },
                {
                    name: 'Aonla',
                    id: '24'
                },
                {
                    name: 'Azamgarh',
                    id: '69'
                },
                {
                    name: 'Badaun',
                    id: '23'
                },
                {
                    name: 'Baghpat',
                    id: '11'
                },
                {
                    name: 'Bahraich',
                    id: '56'
                },
                {
                    name: 'Ballia',
                    id: '72'
                },
                {
                    name: 'Banda',
                    id: '48'
                },
                {
                    name: 'Bansgaon',
                    id: '67'
                },
                {
                    name: 'Barabanki',
                    id: '53'
                },
                {
                    name: 'Bareilly',
                    id: '25'
                },
                {
                    name: 'Basti',
                    id: '61'
                },
                {
                    name: 'Bhadohi',
                    id: '78'
                },
                {
                    name: 'Bijnor',
                    id: '4'
                },
                {
                    name: 'Bulandshahr',
                    id: '14'
                },
                {
                    name: 'Chandauli',
                    id: '76'
                },
                {
                    name: 'Deoria',
                    id: '66'
                },
                {
                    name: 'Dhaurahra',
                    id: '29'
                },
                {
                    name: 'Domariyaganj',
                    id: '60'
                },
                {
                    name: 'Etah',
                    id: '22'
                },
                {
                    name: 'Etawah',
                    id: '41'
                },
                {
                    name: 'Faizabad',
                    id: '54'
                },
                {
                    name: 'Farrukhabad',
                    id: '40'
                },
                {
                    name: 'Fatehpur',
                    id: '49'
                },
                {
                    name: 'Fatehpur Sikri',
                    id: '19'
                },
                {
                    name: 'Firozabad',
                    id: '20'
                },
                {
                    name: 'Gautam Buddha Nagar',
                    id: '13'
                },
                {
                    name: 'Ghaziabad',
                    id: '12'
                },
                {
                    name: 'Ghazipur',
                    id: '75'
                },
                {
                    name: 'Ghosi',
                    id: '70'
                },
                {
                    name: 'Gonda',
                    id: '59'
                },
                {
                    name: 'Gorakhpur',
                    id: '64'
                },
                {
                    name: 'Hamirpur',
                    id: '47'
                },
                {
                    name: 'Hardoi',
                    id: '31'
                },
                {
                    name: 'Hathras',
                    id: '16'
                },
                {
                    name: 'Jalaun',
                    id: '45'
                },
                {
                    name: 'Jaunpur',
                    id: '73'
                },
                {
                    name: 'Jhansi',
                    id: '46'
                },
                {
                    name: 'Kairana',
                    id: '2'
                },
                {
                    name: 'Kaiserganj',
                    id: '57'
                },
                {
                    name: 'Kannauj',
                    id: '42'
                },
                {
                    name: 'Kanpur',
                    id: '43'
                },
                {
                    name: 'Kaushambi',
                    id: '50'
                },
                {
                    name: 'Kheri',
                    id: '28'
                },
                {
                    name: 'Kushi Nagar',
                    id: '65'
                },
                {
                    name: 'Lalganj',
                    id: '68'
                },
                {
                    name: 'Lucknow',
                    id: '35'
                },
                {
                    name: 'Machhlishahr',
                    id: '74'
                },
                {
                    name: 'Maharajganj',
                    id: '63'
                },
                {
                    name: 'Mainpuri',
                    id: '21'
                },
                {
                    name: 'Mathura',
                    id: '17'
                },
                {
                    name: 'Meerut',
                    id: '10'
                },
                {
                    name: 'Mirzapur',
                    id: '79'
                },
                {
                    name: 'Misrikh',
                    id: '32'
                },
                {
                    name: 'Mohanlalganj',
                    id: '34'
                },
                {
                    name: 'Moradabad',
                    id: '6'
                },
                {
                    name: 'Muzaffarnagar',
                    id: '3'
                },
                {
                    name: 'Nagina',
                    id: '5'
                },
                {
                    name: 'Phulpur',
                    id: '51'
                },
                {
                    name: 'Pilibhit',
                    id: '26'
                },
                {
                    name: 'Pratapgarh',
                    id: '39'
                },
                {
                    name: 'Rae Bareli',
                    id: '36'
                },
                {
                    name: 'Rampur',
                    id: '7'
                },
                {
                    name: 'Robertsganj',
                    id: '80'
                },
                {
                    name: 'Saharanpur',
                    id: '1'
                },
                {
                    name: 'Salempur',
                    id: '71'
                },
                {
                    name: 'Sambhal',
                    id: '8'
                },
                {
                    name: 'Sant Kabir Nagar',
                    id: '62'
                },
                {
                    name: 'Shahjahanpur',
                    id: '27'
                },
                {
                    name: 'Shrawasti',
                    id: '58'
                },
                {
                    name: 'Sitapur',
                    id: '30'
                },
                {
                    name: 'Sultanpur',
                    id: '38'
                },
                {
                    name: 'Unnao',
                    id: '33'
                },
                {
                    name: 'Varanasi',
                    id: '77'
                }
            ]
        },
        {
            stateCode: 'S28',
            stateName: 'Uttarakhand',
            constituencies: [
                {
                    name: 'Almora',
                    id: '3'
                },
                {
                    name: 'Garhwal',
                    id: '2'
                },
                {
                    name: 'Hardwar',
                    id: '5'
                },
                {
                    name: 'Nainital-udhamsingh Nagar',
                    id: '4'
                },
                {
                    name: 'Tehri Garhwal',
                    id: '1'
                }
            ]
        },
        {
            stateCode: 'S25',
            stateName: 'West Bengal',
            constituencies: [
                {
                    name: 'Alipurduars',
                    id: '2'
                },
                {
                    name: 'Arambagh',
                    id: '29'
                },
                {
                    name: 'Asansol',
                    id: '40'
                },
                {
                    name: 'Baharampur',
                    id: '10'
                },
                {
                    name: 'Balurghat',
                    id: '6'
                },
                {
                    name: 'Bangaon',
                    id: '14'
                },
                {
                    name: 'Bankura',
                    id: '36'
                },
                {
                    name: 'Barasat',
                    id: '17'
                },
                {
                    name: 'Bardhaman Durgapur',
                    id: '39'
                },
                {
                    name: 'Bardhaman Purba',
                    id: '38'
                },
                {
                    name: 'Barrackpore',
                    id: '15'
                },
                {
                    name: 'Basirhat',
                    id: '18'
                },
                {
                    name: 'Birbhum',
                    id: '42'
                },
                {
                    name: 'Bishnupur',
                    id: '37'
                },
                {
                    name: 'Bolpur',
                    id: '41'
                },
                {
                    name: 'Cooch behar',
                    id: '1'
                },
                {
                    name: 'Darjeeling',
                    id: '4'
                },
                {
                    name: 'Diamond harbour',
                    id: '21'
                },
                {
                    name: 'Dum dum',
                    id: '16'
                },
                {
                    name: 'Ghatal',
                    id: '32'
                },
                {
                    name: 'Hooghly',
                    id: '28'
                },
                {
                    name: 'Howrah',
                    id: '25'
                },
                {
                    name: 'Jadavpur',
                    id: '22'
                },
                {
                    name: 'Jalpaiguri',
                    id: '3'
                },
                {
                    name: 'Jangipur',
                    id: '9'
                },
                {
                    name: 'Jhargram',
                    id: '33'
                },
                {
                    name: 'Joynagar',
                    id: '19'
                },
                {
                    name: 'Kanthi',
                    id: '31'
                },
                {
                    name: 'Kolkata Dakshin',
                    id: '23'
                },
                {
                    name: 'Kolkata Uttar',
                    id: '24'
                },
                {
                    name: 'Krishnanagar',
                    id: '12'
                },
                {
                    name: 'Maldaha Dakshin',
                    id: '8'
                },
                {
                    name: 'Maldaha Uttar',
                    id: '7'
                },
                {
                    name: 'Mathurapur',
                    id: '20'
                },
                {
                    name: 'Medinipur',
                    id: '34'
                },
                {
                    name: 'Murshidabad',
                    id: '11'
                },
                {
                    name: 'Purulia',
                    id: '35'
                },
                {
                    name: 'Raiganj',
                    id: '5'
                },
                {
                    name: 'Ranaghat',
                    id: '13'
                },
                {
                    name: 'Srerampur',
                    id: '27'
                },
                {
                    name: 'Tamluk',
                    id: '30'
                },
                {
                    name: 'Uluberia',
                    id: '26'
                }
            ]
        }
    ];
    return conuntryData;
}

function getListOfAllUrls() {
    var conuntryData = getConuntryData();
    var allurl = [];
    conuntryData.map(function(state) {
        console.log('state', state.stateCode);
        state.constituencies.map(function(c) {
            var url = `http://results.eci.gov.in/pc/en/constituencywise/Constituencywise${
                state.stateCode
            }${c.id}.htm`;
            allurl.push(url);
        });
    });
    console.log(allurl);
    console.log(allurl.length);
    return allurl;
}

function getDataFromUrl(url) {
    return rp(url)
        .then(function(html) {
            var allCandidateData = [];
            var allList = $('table.table-party tr', html);
            var l = allList.length;
            allList.map(function(i, v) {
                if (i > 2 && i !== l - 1) {
                    var data = $(v)
                        .find('td')
                        .map((i, x) => {
                            return $(x).text();
                        });
                    allCandidateData.push({
                        Candidate: data[1],
                        Party: data[2],
                        'EVM Votes': data[3],
                        'Postal Votes': data[4],
                        'Total Votes': data[5]
                    });
                }
            });
            return allCandidateData;
        })
        .catch(function(err) {
            //handle error
            console.error('err', err);
        });
}

function scrapDataforall() {
    var conuntryData = getConuntryData();
    var pArray = [];
    conuntryData.map(function(state) {
        console.log('state', state.stateCode);
        state.constituencies.map(function(c) {
            var url = `http://results.eci.gov.in/pc/en/constituencywise/Constituencywise${
                state.stateCode
            }${c.id}.htm`;
            var p = getDataFromUrl(url).then(function(allCandidateData) {
                var cData = {
                    stateCode: state.stateCode,
                    stateName: state.stateName,
                    name: c.name,
                    cid: c.id,
                    allCandidateData: allCandidateData
                };
                console.log('constituencyData', cData);
                return cData;
            });
            pArray.push(p);
        });
    });
    Promise.all(pArray).then(function(values) {
        console.log('we have scrapped all the data', values.length);
        fs.writeFile(
            'Election2019Results.json',
            JSON.stringify(values, null, '\t'),
            err => {
                if (err) console.log(err);
                console.log('Successfully Written to File.');
            }
        );
    });
}
scrapDataforall();
