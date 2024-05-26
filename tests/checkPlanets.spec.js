const { test, expect } = require('@playwright/test');
const axios = require('axios');

//this represents a very simple API test that can be written using PW and axios a npm.
//I have not done any extraction of methods, from a simple reason that this is just a task, and it has 2 tests,
//for which there is no need to do any complex encaptulation. 
//Since this is a openAPI, no auth is needed, I dont have any handler for the tokens or anything similar. 
//Ideally we would have that, as most of the api-s are behind some security regardless
//For the API tests specifically, I prefer to see the whole request/url within the test, as its much easier to maintain after
//YES there can and should be handler for complex requests, which is not a case here
//In simple words, I dont want to overcoplicate :) If something can be simple, make it simple. 
//Cheers! 


test('Verify number of planets is 60', async () => {
  const baseUrl = 'https://swapi.dev/api/planets';
  
  const getAllPlanets = async (url, planets = []) => {
    const response = await axios.get(url);
    const data = response.data;
    planets = planets.concat(data.results);
    
    if (data.next) {
      return getAllPlanets(data.next, planets);
    } else {
      return planets;
    }
  };

  const planets = await getAllPlanets(baseUrl);
  expect(planets.length).toBe(60);
});

//OR

test('Verify number of planets is 60 --1', async () => {
    const url = 'https://swapi.dev/api/planets';
    
    const response = await axios.get(url);
    const data = response.data;
  
    expect(data.count).toBe(60);
  });

test('Verify total number of people is 82', async () => {
  const baseUrl = 'https://swapi.dev/api/people';
  
  const getAllPeople = async (url, people = []) => {
    const response = await axios.get(url);
    const data = response.data;
    people = people.concat(data.results);
    
    if (data.next) {
      return getAllPeople(data.next, people);
    } else {
      return people;
    }
  };

  const people = await getAllPeople(baseUrl);
  expect(people.length).toBe(82);
});

//OR

test('Verify total number of people is 82 --1', async () => {
    const url = 'https://swapi.dev/api/people';
    
    const response = await axios.get(url);
    const data = response.data;
  
    expect(data.count).toBe(82);
  });

test('Verify first person is Luke Skywalker', async () => {
  const url = 'https://swapi.dev/api/people/1';
  
  const response = await axios.get(url);
  const person = response.data;

  expect(person.name).toBe('Luke Skywalker');
});

test('Verify planet Dorin has a diameter of 13400 and one resident', async () => {
  const baseUrl = 'https://swapi.dev/api/planets';

  const getAllPlanets = async (url, planets = []) => {
    const response = await axios.get(url);
    const data = response.data;
    planets = planets.concat(data.results);
    
    if (data.next) {
      return getAllPlanets(data.next, planets);
    } else {
      return planets;
    }
  };

  const planets = await getAllPlanets(baseUrl);
  const dorin = planets.find(planet => planet.name === 'Dorin');
  
  expect(dorin).toBeDefined();
  expect(dorin.diameter).toBe('13400');
  expect(dorin.residents.length).toBe(1);
});
