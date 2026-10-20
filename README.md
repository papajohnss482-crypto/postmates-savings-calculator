# Postmates Savings Calculator

An interactive tool that calculates what a Postmates order actually costs, with and without a promo code and Uber One.

## Purpose (unique to this site)
Tool. This site exists to answer one question with real math: how much will you actually save? It is not a code list and not a guide, it is a calculator.

## Contents
- index.html: calculator (order total, delivery fee, service fee, promo discount, Uber One toggle) with a worked total
- best-code logic: given order size and user type (new or existing), it shows which current code type wins, percentage vs flat
- meal-deals-math.html: the $12 Meal Deals breakdown with worked examples
- uber-one-math.html: Uber One break-even analysis, at what order frequency the membership pays for itself

## Data rules
- All examples use real prices and real code terms, with dates shown.
- No invented savings claims. Where a code is community-reported, the calculator labels it that way.
- Codes used in this tool are checked against the current list at https://postmatescoupons.us/ (linked as the source in the results section, not as a banner)

## Platform target
Netlify (deployed from this repo). Design: tool first layout, dark theme, no shared template with the other stack sites.
