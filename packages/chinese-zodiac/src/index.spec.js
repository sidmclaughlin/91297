const { ats, ads, aws, ays, axs, chars, quot, words, zip, zip3 } = require('./index');

describe('Test Chinese Zodiac', () => {
  describe('Test Traditional Calendar Strings', () => {
    describe('10 Heavenly Stems', () => {
      test('should match definintion', () => {
        expect(ats()).toEqual([
          ['甲', 'jiă'],
          ['乙', 'yĭ'],
          ['丙', 'bĭng'],
          ['丁', 'dīng'],
          ['戊', 'wù'],
          ['己', 'jĭ'],
          ['庚', 'gēng'],
          ['辛', 'xīn'],
          ['壬', 'rén'],
          ['癸', 'gŭi'],
        ]);
      });
    });

    describe('12 Terrestrial Branches', () => {
      test('should match the definition', () => {
        expect(ads()).toEqual([
          ['子', 'zĭ'],
          ['丑', 'chŏu'],
          ['寅', 'yín'],
          ['卯', 'măo'],
          ['辰', 'chén'],
          ['巳', 'sì'],
          ['午', 'wŭ'],
          ['未', 'wèi'],
          ['申', 'shēn'],
          ['酉', 'yŏu'],
          ['戌', 'xū'],
          ['亥', 'hài'],
        ]);
      });
    });

    describe('5 Elements', () => {
      test('should match the definition', () => {
        expect(aws()).toEqual([
          ['木', 'mù', 'wood'],
          ['火', 'huǒ', 'fire'],
          ['土', 'tǔ', 'earth'],
          ['金', 'jīn', 'metal'],
          ['水', 'shuǐ', 'water'],
        ]);
      });
    });

    describe('12 Symbolic Symbols', () => {
      test('should match the definition', () => {
        expect(axs()).toEqual([
          ['鼠', 'shǔ', 'rat'],
          ['牛', 'niú', 'ox'],
          ['虎', 'hǔ', 'tiger'],
          ['兔', 'tù', 'rabbit'],
          ['龍', 'lóng', 'dragon'],
          ['蛇', 'shé', 'snake'],
          ['馬', 'mǎ', 'horse'],
          ['羊', 'yáng', 'goat'],
          ['猴', 'hóu', 'monkey'],
          ['鸡', 'jī', 'rooster'],
          ['狗', 'gǒu', 'dog'],
          ['豬', 'zhū', 'pig'],
        ]);
      });
    });

    describe('Yang/Yin', () => {
      test('should match definition', () => {
        expect(ays()).toEqual([
          ['阳', 'yáng'],
          ['阴', 'yīn'],
        ]);
      });

      test('should return yang on even years', () => {
        const year = 2022;
        expect(ays()[year % 2]).toEqual(['阳', 'yáng']);
      });

      test('should return yin on odd years', () => {
        const year = 2023;
        expect(ays()[year % 2]).toEqual(['阴', 'yīn']);
      });
    });
  });

  describe('Test Generic Functions', () => {
    describe('Test chars = (s)', () => {
      test('should throw on invalid input', () => {
        expect(() => chars()).toThrow(TypeError);
        expect(() => chars(null)).toThrow(TypeError);
        expect(() => chars(undefined)).toThrow(TypeError);
        expect(() => chars(1000)).toThrow(TypeError);
      });

      test('should return array with the same number of elements as the original string', () => {
        const input = 'alphabet';
        expect(chars(input)).toEqual(['a', 'l', 'p', 'h', 'a', 'b', 'e', 't']);
        expect(chars(input)).toHaveLength(8);
      });
    });

    describe('Test quot = (n) => (m)', () => {
      test('invalid input', () => {
        expect(quot(0)(1)).toEqual(0);
        expect(quot(1)(0)).toEqual(Infinity);
        expect(quot(undefined)(undefined)).toEqual(NaN);
      });

      test('should return truncated value', () => {
        expect(quot(0.5)(1)).toEqual(0);
        expect(quot(1)(1)).toEqual(1);
        expect(quot(10)(3)).toEqual(3);
      });
    });

    describe('Test words = (s)', () => {
      test('should throw on invalid input', () => {
        expect(() => words(null)).toThrow(TypeError);
        expect(() => words(undefined)).toThrow(TypeError);
        expect(() => words(123456)).toThrow(TypeError);
      });

      test('splits sentence into word array', () => {
        expect(words('')).toEqual(['']);
        expect(words('Hello')).toEqual(['Hello']);
        expect(words('The quick brown fox jumped over the lazy dog')).toEqual([
          'The',
          'quick',
          'brown',
          'fox',
          'jumped',
          'over',
          'the',
          'lazy',
          'dog',
        ]);
      });
    });

    describe('Test zip = (xs) => (ys)', () => {
      test('it returns an array containing the provided elements', () => {
        expect(zip(['a'])(['b'])).toEqual([['a', 'b']]);
      });

      test('it returns an array matching the length of the shorter list', () => {
        expect(zip(['a1', 'a2'])(['b'])).toEqual([['a1', 'b']]);
      });
    });

    describe('Test zip3 = (xs) => (ys) => (zs)', () => {
      test('it returns an array containing the provided elements', () => {
        expect(zip3(['a'])(['b'])(['c'])).toEqual([['a', 'b', 'c']]);
      });

      test('it returns an array matching the length of the shorter list', () => {
        expect(zip(['a1', 'a2'])(['b'])).toEqual([['a1', 'b']]);

        // console.log('------------');
        // console.log(showYear(2022));
        // console.log('------------');
        // console.log(zodiac(2022));
        // console.log('------------');
      });
    });
  });
});
