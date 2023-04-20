
var networkAddress = new Array(10,0,0,0);
var networkMask = new Array(255,0,0,0);
var maskBitsArr = new Array();
var maskMap = new Array();
var privateAddressBlocks = new Array();
var addressBlock = '10.0.0.0/8'; //No I18N
var addressBlockMandatoryBits = 8;
var userMaskBits = 8;
var subnetBits = 0;
var hostBits = 0;
var maskBit = 1;
var maxMaskBits = 32;
var usableMaxMaskBits = 30;
var MAX_SIZE_OF_SUBNET = 1024;
var ACTION = 'initialize'; //No I18N
maskMap[1] = "128.0.0.0";
maskMap[2] = "192.0.0.0";
maskMap[3] = "224.0.0.0";
maskMap[4] = "240.0.0.0";
maskMap[5] = "248.0.0.0";
maskMap[6] = "252.0.0.0";
maskMap[7] = "254.0.0.0";
maskMap[8] = "255.0.0.0";
maskMap[9] = "255.128.0.0";
maskMap[10] = "255.192.0.0";
maskMap[11] = "255.224.0.0";
maskMap[12] = "255.240.0.0";
maskMap[13] = "255.248.0.0";
maskMap[14] = "255.252.0.0";
maskMap[15] = "255.254.0.0";
maskMap[16] = "255.255.0.0";
maskMap[17] = "255.255.128.0";
maskMap[18] = "255.255.192.0";
maskMap[19] = "255.255.224.0";
maskMap[20] = "255.255.240.0";
maskMap[21] = "255.255.248.0";
maskMap[22] = "255.255.252.0";
maskMap[23] = "255.255.254.0";
maskMap[24] = "255.255.255.0";
maskMap[25] = "255.255.255.128";
maskMap[26] = "255.255.255.192";
maskMap[27] = "255.255.255.224";
maskMap[28] = "255.255.255.240";
maskMap[29] = "255.255.255.248";
maskMap[30] = "255.255.255.252";
maskMap[31] = "255.255.255.254";
maskMap[32] = "255.255.255.255";

function calculateAndUpdateValues(action, context){
	var blockArr = '';
	var addressBlockSelected = '',
		maskBitsSelected = '',
		subnetMaskSelected = '',
		hostBitsSelected = '',
		networkAddressSelected = '',
		subnetBitsSelected = '';
	var addressBlockElement = document.getElementById('addressBlock');
	var subnetMaskElement = document.getElementById('subnetMask');
	var hostBitsElement = document.getElementById('hostBits');
	var subnetBitsElement = document.getElementById('subnetBits');
	if(action != 'initialize'){
		ACTION = action;
		addressBlockSelected = addressBlockElement.value;
		addressBlock = addressBlockSelected;
		subnetMaskSelected = subnetMaskElement.options[subnetMaskElement.selectedIndex].value;
		hostBitsSelected = hostBitsElement.options[hostBitsElement.selectedIndex].value;
		subnetBitsSelected = parseInt(subnetBitsElement.options[subnetBitsElement.selectedIndex].value,10);
		////console.log('Address block selected : '+addressBlockSelected);
		if(addressBlockSelected.indexOf('/') == -1){
			addressBlockSelected = addressBlockSelected+'/8';
			addressBlock = addressBlockSelected;
		}
		blockArr = addressBlockSelected.split('/');
		//console.log('Array after splitting address block : '+blockArr);	
		if(blockArr[1] == ''){
			blockArr[1] = 8;
			addressBlockSelected = addressBlockSelected+'8';
			addressBlock = addressBlockSelected;
		}
		networkAddressSelected = blockArr[0];
		if(parseInt(blockArr[1]) > 30){
			addressBlockMandatoryBits = 30;
			addressBlockSelected = addressBlockSelected.replace('/'+blockArr[1], '/'+addressBlockMandatoryBits);
			addressBlock = addressBlockSelected;
		}else{
			addressBlockMandatoryBits = parseInt(blockArr[1]);
		}
		
	}
	if(action == 'initialize'){
		addressBlockMandatoryBits = 8;
		document.getElementById('addressBlock').value = addressBlock;
		networkAddressSelected = '10.0.0.0';
		subnetMaskSelected = '255.0.0.0';
		maskBitsSelected = getMaskBitsForSubnetMask(subnetMaskSelected);
		hostBitsSelected = maxMaskBits - maskBitsSelected;
		subnetBitsSelected = maskBitsSelected - parseInt(addressBlockMandatoryBits);
	}else if(action == 'setAddressBlock'){ //No I18N
		maskBitsSelected = parseInt(addressBlockMandatoryBits);
		subnetMaskSelected = maskMap[maskBitsSelected];
		hostBitsSelected = maxMaskBits - maskBitsSelected;
		subnetBitsSelected = maskBitsSelected - parseInt(addressBlockMandatoryBits);
	}else if(action == 'setAddress'){ //No I18N
		maskBitsSelected = parseInt(addressBlockMandatoryBits);
		subnetMaskSelected = maskMap[maskBitsSelected];
		hostBitsSelected = maxMaskBits - maskBitsSelected;
		subnetBitsSelected = maskBitsSelected - parseInt(addressBlockMandatoryBits);
	}else if(action == 'setSubnetMask'){ //No I18N
		maskBitsSelected = getMaskBitsForSubnetMask(subnetMaskSelected);
		subnetMaskSelected = maskMap[maskBitsSelected];
		hostBitsSelected = maxMaskBits - maskBitsSelected;
		subnetBitsSelected = maskBitsSelected - parseInt(addressBlockMandatoryBits);
	}else if(action == 'setNoOfHosts'){ //No I18N
		maskBitsSelected = maxMaskBits - hostBitsSelected;
		subnetMaskSelected = maskMap[maskBitsSelected];
		subnetBitsSelected = maskBitsSelected - parseInt(addressBlockMandatoryBits);
	}else if(action == 'setNoOfSubnets'){ //No I18N
		maskBitsSelected = parseInt(addressBlockMandatoryBits) + parseInt(subnetBitsSelected);
		subnetMaskSelected = maskMap[maskBitsSelected];
		hostBitsSelected = parseInt((maxMaskBits - maskBitsSelected),10);
	}
	//console.log('networkAddressSelected : '+networkAddressSelected+', addressBlockMandatoryBits : '+addressBlockMandatoryBits+', subnetMaskSelected : '+subnetMaskSelected+', maskBitsSelected : '+maskBitsSelected+', hostBitsSelected : '+hostBitsSelected+', subnetBitsSelected : '+subnetBitsSelected);
	setNetworkAddress(networkAddressSelected);
	setNetworkMask(subnetMaskSelected);
	setMaskBits(maskBitsSelected);
	setHostBits(hostBitsSelected);
	setSubnetBits(subnetBitsSelected);
	////console.log('networkAddressSelected : '+networkAddressSelected+', subnetMaskSelected : '+subnetMaskSelected+', maskBitsSelected : '+maskBitsSelected+', hostBitsSelected : '+hostBitsSelected+', subnetBitsSelected : '+subnetBitsSelected);
	updateValues(context);
}

function getMaskBitsForSubnetMask(subnetMask){
	for(var i=0; i<maskMap.length; i++){
		if(maskMap[i] == subnetMask){
			return i;
		}
	}
}

function setMaskBits(maskBitsSelected){
	userMaskBits = maskBitsSelected;
}

function setHostBits(hostBitsValue){
	hostBits = hostBitsValue;
}

function setNetworkAddress(networkAddr){
	////console.log('===================== Setting network address to '+networkAddr+' ========================');
	var networkAddressArr = networkAddr.split('.');
	networkAddress[0] = parseInt(networkAddressArr[0]);
	networkAddress[1] = parseInt(networkAddressArr[1]);
	networkAddress[2] = parseInt(networkAddressArr[2]);
	networkAddress[3] = parseInt(networkAddressArr[3]);
}

function setNetworkMask(networkMaskAddress){
	var networkMaskArr = '',
		maskBits = '';
	networkMaskArr = networkMaskAddress.split('.');
	maskBits = getMaskBitsForSubnetMask(networkMaskAddress);
	networkMask[0] = parseInt(networkMaskArr[0]);
	networkMask[1] = parseInt(networkMaskArr[1]);
	networkMask[2] = parseInt(networkMaskArr[2]);
	networkMask[3] = parseInt(networkMaskArr[3]);
	setMaskBits(maskBits);
	////console.log('===================== Setting network mask to '+networkMask+' ========================');
}

function setSubnetBits(subnetBitsSelected){
	subnetBits = subnetBitsSelected;
	////console.log('addressBlockMandatoryBits : '+addressBlockMandatoryBits+', userMaskBits : '+userMaskBits+', subnetBits : '+subnetBits);
}

function getNumberOfSubnets(){
	////console.log('Number of subnets : '+Math.pow(2,subnetBits));
	return Math.pow(2,subnetBits);
}

function getPossibleNoOfSubnetList(){
	var arrToReturn = new Array();
	maxSubnetBits = maxMaskBits - addressBlockMandatoryBits;
	for(var i=0; i<=maxSubnetBits; i++){
		arrToReturn.push(new Array(i, Math.pow(2,i)));
	}
	return arrToReturn;
}

function getNumberOfHosts(){
	return Math.pow(2,hostBits);
}

function getPossibleNoOfHostsList(){
	var arrToReturn = new Array();
	maxHostBits = maxMaskBits - addressBlockMandatoryBits;
	for(var i=0; i<=maxHostBits; i++){
		arrToReturn.push(new Array(i, Math.pow(2,i)));
	}
	return arrToReturn;
}



function setSubnetMaskForDesignNetwork(elementId) {
	clearOptions(elementId);
	for(var i=addressBlockMandatoryBits; i<maskMap.length; i++){
		addOption(elementId,(maskMap[i]+'/'+i),maskMap[i]);
	}
	selectOption(elementId, maskMap[userMaskBits]);	
}

function setMaskBitsForDesignNetwork(elementId) {
	clearOptions(elementId);
	for (i=addressBlockMandatoryBits; i <=maskBitsArr.length; i++)
	{
		addOptionForCidr(elementId, maskBitsArr[i-1], maskBitsArr[i-1]);
	}
	selectOption(elementId, userMaskBits);
}


function updateValues(context) {
	if(context == 'design'){
		updateDesignNetworkValues();
	}
}

function updateDesignNetworkValues(){
	debugger;
	var noOfSubnets = 1,
		resultArray = 0,
		wildCard = 0,
		maskBits = 0,
		subnetArray = 0,
		aBcast = 0,
		startAddressArr = 0,
		endAddressArray = 0,
		possibleNoOfHostsList = 0;
	
	wildCard = calculateWildCardMask(networkMask);
	maskBits = getBitsFromMask(networkMask);
	subnetArray = getSubnetId(networkAddress,networkMask);
	aBcast = broadcastAddress(networkAddress,wildCard);
	startAddressArr = calculateStartIpAddress(networkAddress,networkMask);
	startIpAddress = startAddressArr.join('.');
	endAddressArray = calculateEndIpAddress(networkAddress,wildCard);
	endIpAddress = endAddressArray.join('.');
	////console.log("Host address range : "+startIpAddress+" - "+endIpAddress);
	//noOfSubnets =  getNumberOfSubnets();
	
	//document.getElementById("subnetID_cidr").value = subnetArray.join('.');
	//document.getElementById("ipAddress").value = networkAddress.join('.');
	
	//document.getElementById("bitmap_cidr").innerHTML = subnetBitmap(networkAddress,networkMask);
	if(addressBlockMandatoryBits >=31 || userMaskBits >=31){
		
		document.getElementById("addressRange_cidr").innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;"; //No I18N
		document.getElementById("cidrNotation").innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;"; //No I18N
		document.getElementById("broadcast_cidr").innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;"; //No I18N
		document.getElementById("wildcard_cidr").innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;"; //No I18N
	}else{
		// document.getElementById("addressRange_cidr").innerHTML = startIpAddress+"&nbsp;&nbsp;-&nbsp;&nbsp;"+endIpAddress; //No I18N
		document.getElementById("addressRange_cidr_in").value = startIpAddress+" - "+endIpAddress; //No I18N
		// document.getElementById("cidrNotation").innerHTML = subnetArray.join('.')+"/"+maskBits;
		document.getElementById("cidrNotation_in").value = subnetArray.join('.')+"/"+maskBits;
		// document.getElementById("broadcast_cidr").innerHTML = aBcast.join('.');
		document.getElementById("broadcast_cidr_in").value = aBcast.join('.');
		// document.getElementById("wildcard_cidr").innerHTML = wildCard.join('.');
		document.getElementById("wildcard_cidr_in").value = wildCard.join('.');
	}
	
	
	//document.getElementById("subnetBits").value = noOfSubnets;
	//setNumberOfHostsForCidr( document.getElementById('hosts_cidr'), networkAddress, maskBits);
	setSubnetMaskForDesignNetwork(document.getElementById('subnetMask'));
	setDesignNetworkOptions(document.getElementById('addressBlock'));
	setHostsList(document.getElementById('hostBits'));
	setSubnetList(document.getElementById('subnetBits'));
	var numberOfSubnets = getNumberOfSubnets();
	if(numberOfSubnets > MAX_SIZE_OF_SUBNET){
		resultArray = generateNetworkAddressRange(0, MAX_SIZE_OF_SUBNET);
		////console.log('Number of subnets : '+noOfSubnets);
		var dottedArray = getDottedArray();
		var resultEndArray = generateNetworkAddressRange((numberOfSubnets-MAX_SIZE_OF_SUBNET), numberOfSubnets);
		resultArray = resultArray.concat(dottedArray).concat(resultEndArray);
		
	}else{
		resultArray = generateNetworkAddressRange(0, numberOfSubnets);
	}
	if(addressBlockMandatoryBits >=31 || userMaskBits >=31){
		document.getElementById("SubnetDetailsDiv").style.display = "none";
		document.getElementById('tableDiv').style.display = "none";
	}else{
		createTable(resultArray);
	}
}

function getDottedArray(){
	var toReturnArray = new Array();
	var sizeOfDottedArray = 2;
	for(var indexOfDottedArr=0; indexOfDottedArr<sizeOfDottedArray; indexOfDottedArr++){
		toReturnArray[indexOfDottedArr] = ['..', '..', '..', '..', '..', '..'];
	}
	return toReturnArray;
}

function generateNetworkAddressRange(subnetStartIndex, subnetEndIndex){
	//console.log('===================== Generate network address from subnet Id : '+subnetStartIndex+' to : '+subnetEndIndex+' ========================');
	var resultArray = new Array();
	var binaryMandatoryBits, binarySubnetBits, binaryRemainingBits, binaryNetworkAddress, binaryBlockAddress;
	binaryBlockAddress = convertOctetToBinary(networkAddress.join('.'));
	binaryMandatoryBits = binaryBlockAddress.substr(0,addressBlockMandatoryBits);
	binarySubnetBits = Array(subnetBits+1).join(0);
	//console.log('addressBlockMandatoryBits : '+addressBlockMandatoryBits+', subnetBits : '+subnetBits);
	//console.log('type of addressBlockMandatoryBits : '+typeof(addressBlockMandatoryBits)+', type of subnetBits : '+typeof(subnetBits));
	binaryRemainingBits = Array((32 - (addressBlockMandatoryBits+subnetBits))+1).join(0);
	noOfSubnets = getNumberOfSubnets();
	////console.log('Chosen address block : '+networkAddress.join('.')+' in binary form : '+binaryBlockAddress);
	////console.log('Number of subnets : '+noOfSubnets+' binaryMandatoryBits ('+addressBlockMandatoryBits+'): '+binaryMandatoryBits+' binarySubnetBits ('+subnetBits+'): '+binarySubnetBits+' binaryRemainingBits ('+(32 - (addressBlockMandatoryBits+subnetBits))+'): '+binaryRemainingBits);
	var networkAddressArrayCounter = 0;
	for(var i=subnetStartIndex; i<subnetEndIndex; i++){
		//console.log('Value of i : '+i);
		var subnetBinaryString = '';
		lengthOfBinaryBits = i.toString(2).length;
		////console.log('Total subnet bits : '+subnetBits+', Length of subnet bit : '+i.toString(2)+' : '+lengthOfBinaryBits);
		if(lengthOfBinaryBits < subnetBits){
			subnetBinaryString = Array((subnetBits - lengthOfBinaryBits)+1).join(0);
			////console.log('subnetBinaryString : '+subnetBinaryString+' = '+(subnetBits - lengthOfBinaryBits));
			subnetBinaryString = subnetBinaryString.concat(i.toString(2));
		}else{
			subnetBinaryString = i.toString(2);
		}
		binaryNetworkAddress = binaryMandatoryBits.toString() + subnetBinaryString.toString() + binaryRemainingBits.toString();
		////console.log('Finding network address for subnet --> '+i+' : '+binaryNetworkAddress+' with subnet binary : '+subnetBinaryString);
		tempNetAddress = convertBinaryToOctet(binaryNetworkAddress);
		////console.log('Binary network address : '+binaryNetworkAddress+' ============ '+tempNetAddress);
		resultArray[networkAddressArrayCounter] = new Array(i, tempNetAddress, networkMask, 0, 0, i+1); // Array(Subnet ID, Network Address, Network Mask, Address Range, Broadcast Address)
		networkAddressArrayCounter+=1;
	}
	//console.log('resultArray inside generateNetworkAddressRange : '+resultArray)
	getSubnetDetails(resultArray);
	return resultArray;
}

function getSubnetDetails(resultArray){
	var networkAddress = 0, 
		networkMask = 0, 
		wildCardMask = 0, 
		broadcastAddr = 0, 
		startAddressArr = 0, 
		endAddressArray = 0, 
		addressRange = 0;
	for(var j=0; j<resultArray.length; j++){
		//console.log('resultArray[j] '+j+'  : '+resultArray[j]);
		networkAddress = resultArray[j][1].split('.');
		networkMask = resultArray[j][2];
		wildCardMask = calculateWildCardMask(networkMask);
		broadcastAddr = broadcastAddress(networkAddress, wildCardMask);
		startAddressArr = calculateStartIpAddress(networkAddress, networkMask);
		endAddressArray = calculateEndIpAddress(networkAddress, wildCardMask);
		startIpAddress = startAddressArr.join('.');
		endIpAddress = endAddressArray.join('.');
		addressRange = startIpAddress+" - "+endIpAddress;
		if(addressBlockMandatoryBits >=31 || userMaskBits >= 31){
			resultArray[j][3] = '--';
			resultArray[j][4] = broadcastAddr.join('.');
		}else{
			resultArray[j][3] = addressRange;
			resultArray[j][4] = broadcastAddr.join('.');
		}
		
		//console.log(j+" ============ "+networkAddress+" ============ "+addressRange+" =========== "+broadcastAddr);
	}
}

function createTable(resultArray) {
	//console.log('Result array length : '+resultArray.length);
	row = new Array();
	cell = new Array();
	row_num = resultArray.length+1	;
	cell_num = 4;
	divElement = document.createElement('div');
	tableElement = document.createElement('table');
	tableElement.setAttribute('id', 'newtable');
	tableElement.setAttribute('class','table table-bordered table-stripped');
	divElement.setAttribute('id', 'newDiv');
	if(resultArray.length < 5){
		// divElement.setAttribute('style','height: auto;width:950px');
	}else{
		// divElement.setAttribute('style','height: 400px;overflow:auto;width:950px');
	}
	tableBodyElement = document.createElement('tbody');
	for (c = 0; c < row_num; c++) {
		row[c] = document.createElement('tr');
		
		for (k = 0; k < cell_num; k++) {
			cell[k] = document.createElement('td');
			cell[k].setAttribute('class','dynamicTableCell');
			
			if(c == 0){
				row[c].setAttribute('class', 'sticky-header');
				if(k==0){
					cell[k].setAttribute('class','bg-banner-solid--blue');
				}else{
					cell[k].setAttribute('class','bg-banner-solid--blue');
				}
				switch (k){
					case 0:
						cont = document.createTextNode('Subnet ID'); //No I18N
						break;
					case 1:
						cont = document.createTextNode('Subnet Address'); //No I18N
						break;
					case 2:
						cont = document.createTextNode('Host Address Range'); //No I18N
						break;
					case 3:
						cont = document.createTextNode('Broadcast Address'); //No I18N
						break;
				}
			}else{
				if(k==0){
					// cell[k].setAttribute('style','width:80px;line-height:40px;');
				}else{
					// cell[k].setAttribute('style','width:273px;line-height:40px;');
				}
				switch (k){
					case 0:
						cont = document.createTextNode(resultArray[c-1][5]);
						break;
					case 1:
						cont = document.createTextNode(resultArray[c-1][1]);
						break;
					case 2:
						cont = document.createTextNode(resultArray[c-1][3]);
						break;
					case 3:
						cont = document.createTextNode(resultArray[c-1][4]);
						break;
				}
				
			}
			cell[k].appendChild(cont);
			row[c].appendChild(cell[k]);
		}
		tableBodyElement.appendChild(row[c]);
	}
	tableElement.appendChild(tableBodyElement);
	divElement.appendChild(tableElement);
	document.getElementById('tableDiv').innerHTML = '';
	document.getElementById("SubnetDetailsDiv").style.display = "block";
	document.getElementById("tableDiv").style.display = "block";
	document.getElementById('tableDiv').appendChild(divElement);
	//document.getElementById('tableDiv').innerHTML = "<pre style='word-wrap: normal;white-space: pre;font-weight: bold;font-size:13px;color:#0B610B;'>"+tableElement.innerHTML+"</pre>";
}

function calculateWildCardMask(netMask){
	////console.log('========================= Wild card mask ========================');
	////console.log('Network mask : '+netMask);
	var toReturn = new Array(0,0,0,0);
	for(var i=0;i<4;i++){
		toReturn[i] = 255 - netMask[i];
	}
	////console.log('Wildcard mask : '+toReturn);
	return toReturn;
}

function calculateEndIpAddress(networkAddress,wildMask){
	////console.log('========================= End Ip address ========================');
	var broadcastAdd = new broadcastAddress(networkAddress,wildMask);
	var broadcastAddDecimal = convertOctetToDecimal(broadcastAdd);
	////console.log('Broadcast address : '+broadcastAdd+' for input address : '+networkAddress+' Wildmask : '+wildMask);
	////console.log('Broadcast address decimal : '+broadcastAddDecimal);
	broadcastAddDecimal = broadcastAddDecimal-1;
	////console.log('Broadcast address octet : '+convertDecimalToOctet(broadcastAddDecimal));
	return convertDecimalToOctet(broadcastAddDecimal);
}

function broadcastAddress(networkAddress,wildMask){
	var toReturn = new Array(0,0,0,0);
	for(var i=0;i<4;i++){
		toReturn[i] = networkAddress[i] | wildMask[i];
	}
	return toReturn;
}

function calculateStartIpAddress(address,netMask){
	var subnetId = getSubnetId(address,netMask);
	var subnetIdDecimal = convertOctetToDecimal(subnetId);
	subnetIdDecimal = subnetIdDecimal+1;
	return convertDecimalToOctet(subnetIdDecimal);
}

function getSubnetId(address,netMask){
	var subnetId = new Array(0,0,0,0);
	for(var i=0;i<4;i++){
		subnetId[i] = address[i] & netMask[i];
	}
	return subnetId;
}

function calculateHost(netMask) {
	var bits = 32 - getBitsFromMask(netMask);
	return Math.pow(2,bits) -2;
}

function getBitsFromMask(netMask) {
	////console.log('========================= Get bits from mask ========================');
	var maskDecimal = convertOctetToDecimal(netMask);
	////console.log('Decimal value for mask : '+netMask+' : '+maskDecimal);
	maskBinary = maskDecimal.toString(2);
	////console.log('Binary value for mask : '+netMask+' : '+maskDecimal+' maskBinary.indexOf(0) : '+maskBinary.indexOf(0));
	return maskBinary.indexOf(0);
}

function convertBinaryToOctet(binaryBits){
	toReturn = new Array(0,0,0,0);
	tempArray = new Array(0,0,0,0);
	////console.log('Converting the Binary bits : '+binaryBits+' to octet value.');
	
	tempArray[0] = binaryBits.substr(0, 8);
	tempArray[1] = binaryBits.substr(8, 8);
	tempArray[2] = binaryBits.substr(16, 8);
	tempArray[3] = binaryBits.substr(24, 8);
	////console.log('Binary address : '+tempArray.join('.')+ ' length : '+tempArray.length);
	toReturn[0] = parseInt(tempArray[0], 2);
	toReturn[1] = parseInt(tempArray[1], 2);
	toReturn[2] = parseInt(tempArray[2], 2);
	toReturn[3] = parseInt(tempArray[3], 2);
	/*
	for(i=0; i<tempArray.length; i++){
		
		//toReturn[i] = parseInt(tempArray[i], 2);
		//console.log('value of i : '+i+', temp array : '+tempArray[i]+', toReturn : '+toReturn[i]);
	}
	*/
	return toReturn.join('.');
}

function convertOctetToBinary(octetValue){
	octetBits = 8;
	addressDecimalArray = octetValue.split('.');
	toReturn = new Array(0,0,0,0);
	toReturn[0] = parseInt(addressDecimalArray[0], 10).toString(2);
	toReturn[1] = parseInt(addressDecimalArray[1], 10).toString(2);
	toReturn[2] = parseInt(addressDecimalArray[2], 10).toString(2);
	toReturn[3] = parseInt(addressDecimalArray[3], 10).toString(2);
	for(var k=0; k<toReturn.length; k++){
		lengthOfBinaryBits = toReturn[k].length;
		if(lengthOfBinaryBits < octetBits){
			subnetBinaryString = Array((octetBits - lengthOfBinaryBits)+1).join(0);
			toReturn[k] = subnetBinaryString.concat(toReturn[k]);
		}else{
			toReturn[k] = toReturn[k];
		}
	}
	return toReturn.join('');
}

function getOctetFromBits(maskBits) {
	////console.log("Mask bits : "+maskBits);
	var maskBits = parseInt(maskBits);
	if( maskBits < 0 | maskBits > 32 ) {
		//console.log('Invalid mask bits');
		return false;
	}
	var ones = "11111111111111111111111111111111";
	////console.log("ones.substring(0,bits) : "+ones.substring(0,maskBits));
	var mask = parseInt(ones.substring(0,maskBits),2);
	////console.log("Octet from cidr mask : "+mask);
	var shift = 32-maskBits;
	mask = mask * Math.pow(2,shift);
	return convertDecimalToOctet(mask);
}

function convertOctetToDecimal(octetValue){
	var decimalValue = 0;
	decimalValue = decimalValue + parseInt(octetValue[0]) * 16777216 ; 
	decimalValue = decimalValue + octetValue[1] * 65536;	
	decimalValue = decimalValue + octetValue[2] * 256;	   
	decimalValue = decimalValue + octetValue[3];
	return decimalValue;
}
function convertDecimalToOctet(decimalValue){
	var zeros = "00000000000000000000000000000000";
	var decimalValueStr = decimalValue.toString(2);
	var decimalValueStr = zeros.substring(0,32-decimalValueStr.length) + decimalValueStr;
	var octetValue = new Array(
		parseInt(decimalValueStr.substring(0,8),2)	
		, (decimalValue & 16711680)/65536	  
		, (decimalValue & 65280)/256		 
		, (decimalValue & 255)
		);		  
	return octetValue;
}

function updateValuesForCIDR(ip, context) {
	//console.log("ip : "+ip);
	var ipa = ip.split('/');
	if( ipa.length == 2 ) {
		var a = ipa[0].split('.');
		networkAddress[0] = parseInt(a[0]);
		networkAddress[1] = parseInt(a[1]);
		networkAddress[2] = parseInt(a[2]);
		networkAddress[3] = parseInt(a[3]);
		networkMask = getOctetFromBits(ipa[1]);
	} else {
		var ipArray = ip.split('.');
		//console.log("ipArray : "+ipArray);
		networkAddress[0] = parseInt(ipArray[0]);
		networkAddress[1] = parseInt(ipArray[1]);
		networkAddress[2] = parseInt(ipArray[2]);
		networkAddress[3] = parseInt(ipArray[3]);
		if(context == 'cidr'){
			networkMask = getOctetFromBits(document.getElementById("maskBits_cidr").value);
		}else{
			networkMask = getOctetFromBits(document.getElementById("maskBits").value);
		}
		
	}
	//console.log("Network mask obtained from mask bits : "+networkMask);
	updateValues(context);
}

function calculateSubnet(mask, context) {
	//console.log("Calculating subnet mask : "+mask);
	if(mask.indexOf(".") == -1){
		maskBit = mask;
		mask = maskMap[parseInt(mask)];
	}
	//console.log("Calculating subnet mask : "+mask);
	var a = mask.split('.');
	networkMask[0] = parseInt(a[0]);
	networkMask[1] = parseInt(a[1]);
	networkMask[2] = parseInt(a[2]);
	networkMask[3] = parseInt(a[3]);
	updateValues(context);
}
function calculateHosts(cidr, context) {
	networkMask = getOctetFromBits(cidr);
	updateValues(context);
}

function setSubnetMask( s, aNet, maskString) {
	s.length = 0;
	var a = new Array(0,0,0,0);
	var i = 0;
	//console.log("aNet : "+aNet);
	if( aNet[0] >= 1 && aNet[0] <= 126 ) {
		a[i++] = 255;
		document.getElementById('classA').checked = true;
	} else if( aNet[0] >= 128 && aNet[0] <= 191 ){
		a[i++] = 255;
		a[i++] = 255;
		document.getElementById('classB').checked = true;
	} else if( aNet[0] >= 192 && aNet[0] <= 223 ){
		a[i++] = 255;
		a[i++] = 255;
		a[i++] = 255;
		document.getElementById('classC').checked = true;
	}

	while( i < 4 ) {
		var t = a[0]+"."+a[1]+"."+a[2]+"."+a[3];
		addOption(s,t,t);
		var pow = 7;
		while(pow >= 0 && !(i==3 && pow<2 )) {
			a[i] = a[i] + Math.pow(2,pow);
			t = a[0]+"."+a[1]+"."+a[2]+"."+a[3];
			addOption(s,t,t);
			pow--;
		}
		i++;
	}
	selectOption(s,maskString);
}
function setSubnetMaskForCidr( s, aNet, maskString) {
	s.length = 0;
	var a = new Array(0,0,0,0);
	var i = 0;
	//console.log("aNet : "+aNet);

	while( i < 4 ) {
		var t = a[0]+"."+a[1]+"."+a[2]+"."+a[3];
		addOption(s,t,t);
		var pow = 7;
		while(pow >= 0 && !(i==3 && pow<2 )) {
			a[i] = a[i] + Math.pow(2,pow);
			t = a[0]+"."+a[1]+"."+a[2]+"."+a[3];
			addOption(s,t,t);
			pow--;
		}
		i++;
	}
	selectOption(s,maskString);
}

function setDesignNetworkOptions(elementId) {
	////console.log('Length of privateAddressBlocks : '+privateAddressBlocks['block1']);
	document.getElementById('addressBlock').value = addressBlock;
	/*
	if(privateAddressBlocks['block1'] == undefined){
		privateAddressBlocks['block1'] = '10.0.0.0/8';
		privateAddressBlocks['block2'] = '172.16.0.0/12';
		privateAddressBlocks['block3'] = '192.168.0.0/16';
		addOption(elementId, privateAddressBlocks['block1'], 'block1');
		addOption(elementId, privateAddressBlocks['block2'], 'block2');
		addOption(elementId, privateAddressBlocks['block3'], 'block3');
	}
	selectOption(elementId, addressBlock);
	*/
}

function setHostsList(elementId) {
	var possibleNoOfHostsList = 0;
	clearOptions(elementId);
	possibleNoOfHostsList = getPossibleNoOfHostsList();
	for(var i=0; i<possibleNoOfHostsList.length; i++){
		addOption(elementId,possibleNoOfHostsList[i][1],possibleNoOfHostsList[i][0]);
	}
	selectOption(elementId, hostBits);
}

function setSubnetList(elementId) {
	var possibleNoOfSubnetList = 0;
	clearOptions(elementId);
	possibleNoOfSubnetList = getPossibleNoOfSubnetList();
	for(var i=0; i<possibleNoOfSubnetList.length; i++){
		addOption(elementId,possibleNoOfSubnetList[i][1],possibleNoOfSubnetList[i][0]);
	}
	selectOption(elementId, subnetBits);
}

function setNumberOfHosts(s,aNet,cidr){
	s.length = 0;
	var pow = 8;
	if( aNet[0] >= 1 && aNet[0] <= 126 ) {
		pow = 24;
	} else if( aNet[0] >= 128 && aNet[0] <= 191 ){
		pow = 16;
	} else if( aNet[0] >= 192 && aNet[0] <= 223 ){
		pow = 8;
	}
	var t = 2;
	while(pow >= 2 ) {
		t = Math.pow(2,pow) -2;
		addOption(s,t,32-pow);
		pow--;
	}
	selectOption(s,cidr);
}
function setNumberOfHostsForCidr(s,aNet,cidr){
	s.length = 0;
	var pow = 8;
	if( aNet[0] >= 1 && aNet[0] <= 126 ) {
		pow = 24;
	} else if( aNet[0] >= 128 && aNet[0] <= 191 ){
		pow = 16;
	} else if( aNet[0] >= 192 && aNet[0] <= 223 ){
		pow = 8;
	}
	pow = 31;
	var t = 2;
	while(pow >= 2 ) {
		t = Math.pow(2,pow) -2;
		addOption(s,t,32-pow);
		pow--;
	}
	selectOption(s,cidr);
}
function populateMaskBits(elementId, value){
	if(maskBitsArr.length == 0 ){
		for (i = 0; i < usableMaxMaskBits; i++)
		{
			maskBitsArr[i] = i+1;
			addOptionForCidr(elementId, maskBitsArr[i], maskBitsArr[i]);
		}
	}
	selectOption(elementId, value);
}

function clearOptions(elementId){
	var length = elementId.options.length;
	for(var i=length-1;i>=0;i--)
    {
    	elementId.remove(i);
    }
}
function addOption(elementId, text ,value){
	var optionElement = document.createElement('option');
	optionElement.text = text;
	optionElement.value = value;
	try {
		elementId.add(optionElement, null);
	} catch(e) {
		elementId.add(optionElement);
	}
}
function addOptionForCidr(elementId, text ,value){
	var optionElement = document.createElement('option');
	optionElement.text = '/'+text;
	optionElement.value = value;
	try {
		elementId.add(optionElement, null);
	} catch(e) {
		elementId.add(optionElement);
	}
}
function selectOption(elementId, value){
	for (var i=0;i<elementId.length;i++){
		if(elementId[i].value == value){
			////console.log("selecting : "+elementId[i].value+"   "+value);
			elementId.selectedIndex = i;
			break;
		}
	}
}

function subnetBitmap(aNet,aMask){
	var map = "";
	var i = 0;
	var cidr = getBitsFromMask(aMask);
	if( aNet[0] >= 1 && aNet[0] <= 126 ) {
		map = "0nnnnnnn"; //No I18N
		i = map.length;
	} else if( aNet[0] >= 128 && aNet[0] <= 191 ){
		map = "10nnnnnn.nnnnnnnn"; //No I18N
		i = map.length-1;
	} else if( aNet[0] >= 192 && aNet[0] <= 223 ){
		map = "110nnnnn.nnnnnnnn.nnnnnnnn"; //No I18N
		i = map.length-2;
	}
	while(i < cidr) {
		if(i%8 == 0){
			map+=".";
		}
		map += "s"; //No I18N
		i++;
	}
	while(i < 32) {
		if(i%8 == 0){
			map+=".";
		}
		map += "h"; //No I18N
		i++;
	}

	return map;
}