# Prisma-tryout

NOTE: Jest looks like making an overhead and using up to 75% more execution time.

## Test #01 [basic execution time]:

    Item Count: 2000

    With Jest : ./__tests__/sample_base_01.js
      Total   : 19.822 s
      Per item: 9.911 ms

    No Jest   : ./tryout_02.js
      Total   : 8.869 s
      Per item: 4.4345 ms

    Originally:
    No Jest   : ./tryout_02.js
      Total   : 11.506 s
      Per item: 5.753 ms

#

## Test 03 - Only Prisma Models:

    $ node tryout_03.only_prisma_models.js
    Average Execution Time: 4.29275ms
    Exec Item Count: 8000
    Total Execution Time: 34.342s [34342ms]
