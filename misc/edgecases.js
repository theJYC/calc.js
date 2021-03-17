/*
edge-case log:

There is a couple of edge cases that still need to be fixed (in order of priority):

 1) % (percent) function outputing without convertToReadable() taking place
 -this must be to do with .toExponent() not being entirely compatible for small numbers in JS.
 -this must also be tied to edge case 1) above.
 -this kind of is tied to edge case 1a), but different
  because the fix will have to be a local fix to the percent() function
  (applying the same fix from operate() to percent(), re: floats btw 0 and 1).

 2) 0.33333223455433 input (after being converted to 0.00e+0) plus operator and operand will output 0.
 -evidently this bug has to do with stage 1) of the calculator.
 -will need to isolate the fix on there.
 -ideally, 0.3333333 will be turned to 0.333333 (.toFixed(6 or etc.)).

 3) when operator buttons are clicked multiple times
 -stage the last pressed operator, and ignore the previous ones.
 -maybe add a visual function to indicate the operator 'in action'.

 4) when more than one . (decimal point) is clicked
 -disable the decimal point button once it has been staged once on the screen.

n.b. these edge cases were not fixed at the time this script was written
given that they are centered around doing a deeper dive into JS's unique way of handling numbers.

since the priority was to exercise my newfound knowledge of DOM manipulation,
i will be putting a pause on working on those edge cases until further notice
since the learning priority was achieved.

learned a whole lot about js & interactive web dev! :)
*/
