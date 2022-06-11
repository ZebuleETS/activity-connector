const DslParser = require('../../utils/dsl-parser')

/* Function called only once before all the tests in this file */
beforeAll(() => {
    // Use returns if the function your going to call returns a promess
    return true;
});

/* Function called only once after all the tests in this file */
afterAll(() => {
    // Use returns if the function your going to call returns a promess
    return true;
});

/* Function called before each of the tests in this file */
beforeEach(() => {
    true;
});

/* Function called after each of the tests in this file */
afterEach(() => {
    true;
});

/*-------DSL TESTS--------*/

test('Test parser basic', () => {
    expect(DslParser.parse("E1 S2\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m"))
    .toStrictEqual(
        [
            [],
            [
               "Exam 1:Seminar 2",
               "Moodle Quiz 1: opens:Seminar 1(end)null, closes: Seminar 2(start)-,30,m,",
               "Moodle Homework 1: allow submissions after:Laboratory 2(end)null, due date: Laboratory 3(start)-,1,d,@,23:55, cutoff date: Laboratory 3(start)-,1,d,@,23:55",
               "Moodle Quiz 1: opens:Seminar 1(end)+,1,h,, closes: Practicum 2(start)-,15,m,"
            ],
            "EOF"
        ]
    );
});

test('Test parser with a lot of stuff', () => {
    expect(DslParser.parse("E1 S2\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S+1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15w\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nE2 S13"))
    .toStrictEqual(
        [
            [],
            [
               "Exam 1:Seminar 2",
               "Moodle Quiz 1: opens:Seminar 1(end)null, closes: Seminar 2(start)-,30,m,",
               "Moodle Homework 1: allow submissions after:Laboratory 2(end)null, due date: Laboratory 3(start)-,1,d,@,23:55, cutoff date: Laboratory 3(start)-,1,d,@,23:55",
               "Moodle Quiz 1: opens:Seminar 1(end)+,1,h,, closes: Practicum 2(start)-,15,m,",
               "Moodle Quiz 1: opens:Seminar 1(end)null, closes: Seminar 2(start)-,30,m,",
               "Moodle Homework 1: allow submissions after:Laboratory 2(end)null, due date: Laboratory 3(start)-,1,d,@,23:55, cutoff date: Laboratory 3(start)-,1,d,@,23:55",
               "Moodle Quiz 1: opens:Seminar 1(end)+,1,h,, closes: Practicum 2(start)-,15,m,",
               "Moodle Quiz 1: opens:Seminar 1(end)null, closes: Seminar 2(start)-,30,m,",
               "Moodle Homework 1: allow submissions after:Laboratory 2(end)null, due date: Laboratory 3(start)-,1,d,@,23:55, cutoff date: Laboratory 3(start)-,1,d,@,23:55",
               "Moodle Quiz 1: opens:Seminar 1(end)+,1,h,, closes: Practicum 2(start)-,15,m,",
               "Moodle Quiz 1: opens:Seminar 1(end)null, closes: Seminar 2(start)-,30,m,",
               "Moodle Homework 1: allow submissions after:Laboratory 2(end)null, due date: Laboratory 3(start)-,1,d,@,23:55, cutoff date: Laboratory 3(start)-,1,d,@,23:55",
               "Moodle Quiz 1: opens:Seminar 1(end)+,1,h,, closes: Practicum 2(start)-,15,m,",
               "Moodle Quiz 1: opens:Seminar 1(end)null, closes: Seminar 2(start)-,30,m,",
               "Moodle Homework 1: allow submissions after:Laboratory 2(end)null, due date: Laboratory 3(start)-,1,d,@,23:55, cutoff date: Laboratory 3(start)+,1,d,@,23:55",
               "Moodle Quiz 1: opens:Seminar 1(end)+,1,h,, closes: Practicum 2(start)-,15,m,",
               "Moodle Quiz 1: opens:Seminar 1(end)null, closes: Seminar 2(start)-,30,m,",
               "Moodle Homework 1: allow submissions after:Laboratory 2(end)null, due date: Laboratory 3(start)-,1,d,@,23:55, cutoff date: Laboratory 3(start)-,1,d,@,23:55",
               "Moodle Quiz 1: opens:Seminar 1(end)+,1,h,, closes: Practicum 2(start)-,15,w,",
               "Moodle Quiz 1: opens:Seminar 1(end)null, closes: Seminar 2(start)-,30,m,",
               "Moodle Homework 1: allow submissions after:Laboratory 2(end)null, due date: Laboratory 3(start)-,1,d,@,23:55, cutoff date: Laboratory 3(start)-,1,d,@,23:55",
               "Moodle Quiz 1: opens:Seminar 1(end)+,1,h,, closes: Practicum 2(start)-,15,m,",
               "Exam 2:Seminar 13"
            ],
            "EOF"
        ]
    );
});