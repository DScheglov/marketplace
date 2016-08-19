# Marketplace sendbox

## Requirements
 - node v.5+
 - mongodb v.3.2.4

## Installation
```shell
git clone https://github.com/DScheglov/marketplace.git
cd marketplace
npm install
```

## Running
```shell
node server
```

## Debugging
1. Install `node-inspector` globally
```shell
sudo npm install -g node-inspector
```
2. Run it in dedicated thread:
```shell
node-inspector
```
3. Run marketplace server in debug mode
```shell
node --debug server
```
4. Start browser and open `http://localhost:8080`


## Initializing DB with send-box cases
```shell
node reset-db --case <case_name>
```

`case_name` is a folder name in `./fixtures` directory. Currently one of the
following:
 - `20-20-1` (default*)
 - `buy-whole-loan`
 - `many-commitments`

 **Warning**: you should update 'expired' fields in the buy-offers.js and
 sell-offers.js file in appropriate case.
