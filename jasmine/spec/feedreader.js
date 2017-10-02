/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This test suite focuses on the RSS feeds definitions,
    * the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test ensures the allFeeds variable has been
         * defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
             allFeeds.forEach(function(feed) {
               expect(feed.name).toBeDefined();
               expect(feed.name.length).not.toBe(0);
             });
         });

    });

    /* This test suite focuses on "The menu" */
    describe('The Menu', function() {

        /* This test ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. It
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('is displayed and hidden when clicked', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

    });

    /* This test suite focuses on "Initial Entries" */
    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Because loadFeed() is asynchronous, this test uses
         * Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         it('have at least one entry', function() {
           expect($('.feed .entry').length).not.toBe(0);
         });

    });

    /* This test suite focuses on "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         var firstFeed;
         var secondFeed;
         beforeEach(function(done) {
           loadFeed(0, function() {
             firstFeed = $('.feed').html();
             loadFeed(1, function() {
               secondFeed = $('.feed').html();
               done();
             });
           });
         });

         it('results in content change', function() {
           expect(secondFeed).not.toBe(firstFeed);
         });

    });

}());
