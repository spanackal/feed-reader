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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        it('validate that feeds are non empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(1);
        });

        it('validate that each feed has a non empty feed url', function() {
            for (let feed of allFeeds){
                expect(feed.url).not.toBeUndefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }

        });

        it('validate that each feed has a non empty feed name', function() {
        for (let feed of allFeeds){
            expect(feed.name).not.toBeUndefined();
            expect(feed.name.length).toBeGreaterThan(0);
        }

    });

    });

    describe('The menu', function() {
        let body = document.querySelector('body');

        it('validate that menu element is hidden by default', function() {
        expect(body.classList.contains("menu-hidden")).toBe(true);
        });

        it('validate that menu display is toggled every time the user clicks', function() {
            let menu = document.querySelector('a[class*="menu"]');
            menu.click();
            expect(body.classList.contains("menu-hidden")).toBe(false);
            menu.click();
            expect(body.classList.contains("menu-hidden")).toBe(true);
        });


    });

    describe('Initial Entries', function() {

        beforeEach(function(done){
            loadFeed(0,done);
        })

        it('validate that feed container has more than one childElement when loadFeed function has been successfully completed ', function() {
            let feed = document.querySelector('.feed');
            expect(feed.childElementCount).toBeGreaterThan(0);
        });


        describe('New Feed Selection', function() {
            let feed = document.querySelector('.feed');
            let firstFeedTextList = [];
            let secondFeedTextList = [];

            beforeEach(function(done){
                loadFeed(0);
                Array.from(feed.children).forEach(function(child){
                    firstFeedTextList.push(child.innerText);
                });
                loadFeed(1,done);
            })

            it('validate that content for two separate loadFeed calls do not return the same result', function() {
                Array.from(feed.children).forEach(function(child,index){
                    secondFeedTextList.push(child.innerText);
                    expect(firstFeedTextList[index] == secondFeedTextList[index]).toBe(false);
                })
            })

        })
    });
}());
