# The Big Riddle Questioner

## Question 1: `term` & `keywordField`

You have this query:

```json
{
  "query": {
    "term": {
      "keywordField": {
        "value": "Geller"
      }
    }
  }
}
```

And these documents:

1. keywordField: "Joey"
2. keywordField: "Rachel Green-Geller"
3. keywordField: "Ross Geller"
4. keywordField: "Monica geller Bing"
5. keywordField: "Chandler Bing"
6. keywordField: "Gunther hates Ross Gellerrr"

What document/s would be returned?

.
.
.
.
.

(Answer: 0. Why? `term` + `keywordField` looks for an EXACT MATCH. Just matching 1 word isn't enough).

---

## Question 2: `term` & `textField`

You have this query:

```json
{
  "query": {
    "term": {
      "textField": {
        "value": "Geller"
      }
    }
  }
}
```

And these documents:

1. textField: "Joey"
2. textField: "Rachel Green-Geller"
3. textField: "Ross Geller"
4. textField: "Monica geller Bing"
5. textField: "Chandler Bing"
6. textField: "Gunther hates Ross Gellerrr"

What document/s would be returned?

.
.
.
.
.

(Answer: 0. Why? `term` + `textField` takes the field's value, lowercases it, and then checks the provided value against it. The provided value stays AS-IS! Which means that if it contains an uppercase letter, there's a 0 percent chance for a match).

---

## Question 3: `term` & `textField`

You have this query:

```json
{
  "query": {
    "term": {
      "textField": {
        "value": "geller"
      }
    }
  }
}
```

And these documents:

1. textField: "Joey"
2. textField: "Rachel Green-Geller"
3. textField: "Ross Geller"
4. textField: "Monica geller Bing"
5. textField: "Chandler Bing"
6. textField: "Gunther hates Ross Gellerrr"

What document/s would be returned?

.
.
.
.
.

(Answer: 3. Why? `term` + `textField` takes the field's value, lowercases it, and then checks the provided value against it. The provided value stays AS-IS! Which means that if it contains an uppercase letter, there's a 0 percent chance for a match).

---

## Question 4: `term` & `textAndKeywordField`

You have this query:

```json
{
  "query": {
    "term": {
      "textAndKeywordField": {
        "value": "bing"
      }
    }
  }
}
```

And these documents:

1. textField: "Joey"
2. textField: "Rachel Green-Geller"
3. textField: "Ross Geller"
4. textField: "Monica geller Bing"
5. textField: "Chandler Bing"
6. textField: "Gunther hates Ross Gellerrr"

What document/s would be returned?

.
.
.
.
.

(Answer: 2. Why? Because by default `term` + `textAndKeywordField` considers the field as of `text` type. And when it is text type, we already know what happens - `text` type is being processed, which means everything is lowercased, "Bing" becomes "bing", and then the compare gives us a match).

---

## Question 5: `term` & `textAndKeywordField` + ".keyword"

You have this query:

```json
{
  "query": {
    "term.keyword": {
      "textAndKeywordField": {
        "value": "Joey.keyword" // before that, ask about "Joey"
      }
    }
  }
}
```

And these documents:

1. textField: "Joey"
2. textField: "Rachel Green-Geller"
3. textField: "Ross Geller"
4. textField: "Monica geller Bing"
5. textField: "Chandler Bing"
6. textField: "Gunther hates Ross Gellerrr"

What document/s would be returned?

.
.
.
.
.

(Answer: 0. Why? Because this is a trick question. The ".keyword" is on the wrong section. It should be on the `fieldName`).

---

## Question 6: `term` & `boolean`

You have this query:

```json
{
  "query": {
    "term": {
      "booleanField": 0
    }
  }
}
```

And these documents:

1. 3 documents with `true`
2. 2 documents with `false`
3. 1 document doesn't have the field `booleanField`

How many document/s would return?

.
.
.
.
.

(Answer: 0. Why? Because this is a trick question. The ".keyword" is on the wrong section. It should be on the `fieldName`).
