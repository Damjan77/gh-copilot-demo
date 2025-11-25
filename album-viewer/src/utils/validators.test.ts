

import { describe, it } from 'mocha';
import { expect } from 'chai';

import {
  isValidAlbumTitle,
  isValidAlbumYear,
  isValidArtistName,
  parseFrenchDate,
  isValidGUID,
  isValidIPv6,
  sortAlbums,
  validateDate,
  validateIPV6
} from './validators';
  it('validateDate', () => {
    expect(validateDate('25/11/2025')).to.eql(new Date(2025, 10, 25));
    expect(validateDate('31/02/2022')).to.be.null;
    expect(validateDate('invalid')).to.be.null;
  });

describe('validators', () => {
  it('isValidAlbumTitle', () => {
    expect(isValidAlbumTitle('Test')).to.be.true;
    expect(isValidAlbumTitle('')).to.be.false;
    expect(isValidAlbumTitle('   ')).to.be.false;
  });

  it('isValidAlbumYear', () => {
    expect(isValidAlbumYear(2022)).to.be.true;
    expect(isValidAlbumYear(1899)).to.be.false;
    expect(isValidAlbumYear(new Date().getFullYear() + 1)).to.be.false;
  });

  it('isValidArtistName', () => {
    expect(isValidArtistName('Artist')).to.be.true;
    expect(isValidArtistName('')).to.be.false;
    expect(isValidArtistName('   ')).to.be.false;
  });

  it('parseFrenchDate', () => {
    expect(parseFrenchDate('25/11/2025')).to.eql(new Date(2025, 10, 25));
    expect(parseFrenchDate('31/02/2022')).to.be.null;
    expect(parseFrenchDate('invalid')).to.be.null;
  });

  it('isValidGUID', () => {
    expect(isValidGUID('123e4567-e89b-12d3-a456-426614174000')).to.be.true;
    expect(isValidGUID('invalid-guid')).to.be.false;
  });

  it('isValidIPv6', () => {
    expect(isValidIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).to.be.true;
    expect(isValidIPv6('invalid-ip')).to.be.false;
  });

  it('sortAlbums', () => {
    const albums = [
      { title: 'B', artist: 'Y', genre: 'Rock' },
      { title: 'A', artist: 'X', genre: 'Jazz' },
      { title: 'C', artist: 'Z', genre: 'Pop' }
    ];
    expect(sortAlbums(albums, 'title').map(a => a.title)).to.eql(['A', 'B', 'C']);
    expect(sortAlbums(albums, 'artist').map(a => a.artist)).to.eql(['X', 'Y', 'Z']);
    expect(sortAlbums(albums, 'genre').map(a => a.genre)).to.eql(['Jazz', 'Pop', 'Rock']);
  });

  // Stub test for validateAlbumId
    // Stub test for validateAlbumId
    // it('validateAlbumId', () => {
    //   // Add your test cases here when validateAlbumId is implemented
    //   expect(typeof validateAlbumId).to.equal('function');
    // });
});
