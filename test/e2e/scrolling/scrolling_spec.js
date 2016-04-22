describe('scrolling', function() {
  var utilities = require('../helpers/utilities.js');

  beforeEach(function() {
    utilities.resizeWindow(800, 600);
  });

  describe('native-scrolling=true', function() {

    it('mouse wheel can reach bottom of frame', function() {
      browser.get('scrolling/native_scrolling.html').then(function() {
        utilities.setStyle('stage', {
          width: '650px',
          height: '650px'
        }).then(function() {
          utilities.scrollDown('layer').then(function() {
            utilities.scrollDown('layer').then(function() {
              utilities.scrollDown('layer').then(function() {
                protractor.promise.all([utilities.getBoundingClientRect('layer'),
                  utilities.getBoundingClientRect('frame1'),
                  utilities.getScroll('layer')
                ]).then(function(data) {
                  var layer_dimensions = data[0];
                  var frame_dimensions = data[1];
                  var layer_scroll = data[2];

                  expect(layer_scroll.scrollTop).toBe(frame_dimensions.height - layer_dimensions.height);
                })
              });
            });
          });
        });
      });
    });

    it('mouse wheel can reach right of frame', function() {
      browser.get('scrolling/native_scrolling.html').then(function() {
        utilities.setStyle('stage', {
          width: '450px',
          height: '500px'
        }).then(function() {
          utilities.setAttribute('frame1', 'data-wl-fit-to', 'height').then(function() {
            utilities.resizeWindow(800, 599);
            utilities.scrollRight('layer').then(function() {
              utilities.scrollRight('layer').then(function() {
                utilities.scrollRight('layer').then(function() {
                  protractor.promise.all([utilities.getBoundingClientRect('layer'),
                    utilities.getBoundingClientRect('frame1'),
                    utilities.getScroll('layer')
                  ]).then(function(data) {
                    var layer_dimensions = data[0];
                    var frame_dimensions = data[1];
                    var layer_scroll = data[2];

                    expect(layer_scroll.scrollLeft).toBe(frame_dimensions.width - layer_dimensions.width);
                  });
                });
              });
            });
          });
        });
      });
    });

    it('start-position=bottom, test whether the scrollTop and length of scrollable area has been set correctly after transition', function() {
      browser.get('scrolling/native_scrolling.html').then(function() {
        protractor.promise.all([utilities.setStyle('frame2', {
          width: '500px',
          height: '800px'
        }), utilities.setStyle('stage', {
          width: '500px',
          height: '500px'
        })]).then(function() {
          utilities.setAttribute('frame2', 'data-wl-start-position', 'bottom').then(function() {
            utilities.setAttribute('frame2', 'data-wl-fit-to', 'width').then(function() {
              utilities.transitionTo('layer', 'frame2', {}).then(function() {
                protractor.promise.all([
                  utilities.getBoundingClientRect('layer'),
                  utilities.getBoundingClientRect('frame2'),
                  utilities.getScroll('layer'),
                  utilities.getBoundingClientRect('scroller')
                ]).then(function(data) {
                  var layer_dimensions = data[0];
                  var frame_dimensions = data[1];
                  var layer_scroll = data[2];
                  var scroller_dimensions = data[3];

                  expect(layer_scroll.scrollTop).toBe(frame_dimensions.height - layer_dimensions.height);
                  expect(scroller_dimensions.height).toBe(frame_dimensions.height);
                });
              });
            });
          })
        });
      });
    });

    it('start-position=right, test whether the scrollLeft and length of scrollable area has been set correctly after transition', function() {
      browser.get('scrolling/native_scrolling.html').then(function() {
        protractor.promise.all([utilities.setStyle('frame2', {
          width: '800px',
          height: '500px'
        }), utilities.setStyle('stage', {
          width: '500px',
          height: '500px'
        })]).then(function() {
          utilities.setAttribute('frame2', 'data-wl-start-position', 'right').then(function() {
            utilities.setAttribute('frame2', 'data-wl-fit-to', 'height').then(function() {
              utilities.transitionTo('layer', 'frame2', {}).then(function() {
                protractor.promise.all([
                  utilities.getBoundingClientRect('layer'),
                  utilities.getBoundingClientRect('frame2'),
                  utilities.getScroll('layer'),
                  utilities.getBoundingClientRect('scroller')
                ]).then(function(data) {
                  var layer_dimensions = data[0];
                  var frame_dimensions = data[1];
                  var layer_scroll = data[2];
                  var scroller_dimensions = data[3];

                  expect(layer_scroll.scrollLeft).toBe(frame_dimensions.width - layer_dimensions.width);
                  expect(scroller_dimensions.width).toBe(frame_dimensions.width);
                });
              });
            });
          })
        });
      });
    });

  });

  describe('native-scrolling=false', function() {

    it('mouse wheel can reach bottom of frame', function() {
      browser.get('scrolling/non_native_scrolling.html').then(function() {
        utilities.setStyle('stage', {
          width: '500px',
          height: '300px'
        }).then(function() {
          utilities.resizeWindow(800, 599);
          utilities.scrollDown('layer').then(function() {
            utilities.scrollDown('layer').then(function() {
              utilities.scrollDown('layer').then(function() {
                utilities.scrollDown('layer').then(function() {
                  protractor.promise.all([utilities.getBoundingClientRect('stage'),
                    utilities.getBoundingClientRect('frame1'),
                    utilities.getScroll('layer')
                  ]).then(function(data) {
                    var layer_dimensions = data[0];
                    var frame_dimensions = data[1];

                    expect(frame_dimensions.top).toBe(layer_dimensions.height - frame_dimensions.height);
                  })
                });
              });
            });
          });
        });
      });
    });


    it('start-position=bottom, test whether the scrollTop and length of scrollable area has been set correctly after transition', function() {
      browser.get('scrolling/non_native_scrolling.html').then(function() {
        protractor.promise.all([utilities.setStyle('frame2', {
          width: '500px',
          height: '800px'
        }), utilities.setStyle('stage', {
          width: '500px',
          height: '500px'
        })]).then(function() {
          utilities.setAttribute('frame2', 'data-wl-start-position', 'bottom').then(function() {
            utilities.setAttribute('frame2', 'data-wl-fit-to', 'width').then(function() {
              utilities.transitionTo('layer', 'frame2', {}).then(function() {
                protractor.promise.all([
                  utilities.getBoundingClientRect('stage'),
                  utilities.getBoundingClientRect('frame2'),
                ]).then(function(data) {
                  var stage_dimensions = data[0];
                  var frame_dimensions = data[1];
                  expect(frame_dimensions.top).toBe(stage_dimensions.height - frame_dimensions.height);
                });
              });
            });
          })
        });
      });
    });

    it('start-position=right, test whether the scrollLeft and length of scrollable area has been set correctly after transition', function() {
      browser.get('scrolling/non_native_scrolling.html').then(function() {
        protractor.promise.all([utilities.setStyle('frame2', {
          width: '800px',
          height: '500px'
        }), utilities.setStyle('stage', {
          width: '500px',
          height: '500px'
        })]).then(function() {
          utilities.setAttribute('frame2', 'data-wl-start-position', 'right').then(function() {
            utilities.setAttribute('frame2', 'data-wl-fit-to', 'height').then(function() {
              utilities.transitionTo('layer', 'frame2', {}).then(function() {
                protractor.promise.all([
                  utilities.getBoundingClientRect('stage'),
                  utilities.getBoundingClientRect('frame2'),
                ]).then(function(data) {
                  var stage_dimensions = data[0];
                  var frame_dimensions = data[1];

                  expect(frame_dimensions.left).toBe(stage_dimensions.width - frame_dimensions.width);
                });
              });
            });
          })
        });
      });
    });
  });
});
