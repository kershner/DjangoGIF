$(document).ready(function () {
	homeFadeIn();
	colorPageElements();
	colorMainForm();
	gifIsotope();
	tagManager();
	showAddForm();
	gifGrabber();
	gifGrabberSuggestions();
	setInterval(function() {gifGrabberSuggestions()}, 8000);
	hoverGifs();
	copyUrl();
	addTags();
	selectTagToRemove();
	bulkOperations();
	showInnerNav();
	deleteProfile();
	partyModeToggle();
});

var colors = ['#25B972', '#498FBD', '#ff6767', '#FFA533', '#585ec7', '#FF8359'];

// Standard Fisher-Yates shuffle algorithm
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// Fades in elements on the splash page
function homeFadeIn() {
	setTimeout(function() {
		$('.main-logo-gif, .main-logo-cache').css({
			'opacity': '1.0'
		});
	}, 1200);
	setTimeout(function() {
		$('.slogan, .home-links-wrapper, .home-arrow').css({
			'opacity': '1.0'
		});
	}, 1600);
}

// Picks colors and applies them to various elements on page load
function colorPageElements() {	
	var randomnumber = (Math.random() * (colors.length - 0 + 1) ) << 0
	var counter = randomnumber;
	$('.loading i, .home-arrow').css({'color': colors[randomnumber]});
	$('.tag-group').each(function() {
		if (counter > colors.length - 1 ) {
			counter = 0;
		}
		var color = colors[counter];
		$(this).css({
			'background-color': color
		});
		$(this).find('.tag-manager-options-title').css({
			'background-color': color
		});
		$(this).find('.tag-title').css('background-color', color);
		$(this).find('.tag-settings-icon').css('background-color', color);
		$(this).find('.tag-manager-options').css('background-color', color);
		$(this).find('.tag-manager-form form').each(function(){
			$(this).css('background-color', color);
		});
		counter += 1
	});
	$('.nav-logo-circle').css({
		'background-color': colors[randomnumber]
	});
	var profileInfoColor = colors[Math.floor(Math.random() * colors.length)];
	$('.profile-info').css({
		'background-color': profileInfoColor
	});
	$('.profile-avatar img, .profile-avatar video').css({
		'background-color': profileInfoColor
	});
	$('.bulk-option').each(function() {
		var bulkOptionColor = colors[Math.floor(Math.random() * colors.length)];
		$(this).css({
			'border-top': '.15em solid ' + bulkOptionColor
		});
	});
	$('.home-section, .home-whatsnew-version').each(function() {
		if (counter > colors.length - 1 ) {
			counter = 0;
		}
		var homeColor = colors[counter];
		$(this).css({
			'background-color': homeColor
		});
		counter += 1
	});
	$('.nav-links a, .profile-nav-link').each(function() {
		var classes = ['red', 'yellow', 'purple', 'peach'];
		if (counter > classes.length - 1 ) {
			counter = 0;
		}
		var dynamicClass = classes[counter] + '-border';
		$(this).addClass(dynamicClass);
		counter += 1
	});
	$('.startup-icon').each(function() {
		if (counter > colors.length - 1 ) {
			counter = 0;
		}
		var color = colors[counter];
		$(this).css({
			'background-color': color
		});
		counter += 1
	});
}

// Colors the border-bottom CSS property of the main form elements
function colorMainForm() {
	var randomnumber = (Math.random() * (colors.length - 1) ) << 0
	var counter = randomnumber;
	$('.main-form, .main-form h1, .title, .suggestions-title').css({
		'background-color': colors[counter]
	});
	counter += 1;
	$('.main-field').each(function() {
		if (counter > colors.length - 1 ) {
			counter = 0;
		}
		var color = colors[counter];
		$(this).css({
			'border-bottom': '.3em solid ' + color
		});
		counter += 1
	});
	$('select').css({
		'border-bottom': '.3em solid ' + colors[counter]
	});
}

// Handles the Isotope grids and sorting
function gifIsotope() {
	var grid = $('.tag-group').isotope({
		itemSelector: '.gif-grid-element',
		masonry: {
			columnWidth: '.gif-grid-element',
			isFitWidth: true
		},
		getSortData: {
			label: '.gif-label'
		}
	});
	var labelClicked = true;
	$('.sort-label').on('click', function() {
		$(this).toggleClass('green-btn-selected');
		if (labelClicked === false) {
			labelClicked = true;
			grid.isotope({
				sortBy: 'label',
				sortAscending: true
			});
		} else {
			labelClicked = false;
			grid.isotope({
				sortBy: 'label',
				sortAscending: false
			});
		}
	});
	var dateClicked = true;
	$('.sort-date').on('click', function() {
		$(this).toggleClass('blue-btn-selected');
		if (dateClicked === false) {
			dateClicked = true;
			grid.isotope({
				sortBy: 'original-order',
				sortAscending: true
			});
		} else {
			dateClicked = false;
			grid.isotope({
				sortBy: 'original-order',
				sortAscending: false
			});
		}
	});
	$('.sort-random').on('click', function() {
		console.log('Shuffling grids!');
		grid.isotope('shuffle');
	});
	var taggedGrid = $('#tagged-gif-grid').isotope({
		itemSelector: '.tag-group',
		layoutMode: 'packery',
		packery: {
			gutter: 10
		}
	});
}

// Shows/hides the tag manager forms
function tagManager() {
	$('.tag-settings-icon').on('click', function() {
		$(this).siblings('.tag-manager').toggleClass('hidden');
		$(this).toggleClass('tag-settings-icon-clicked');
	});
	$('.rename').on('click', function() {
		var form = $(this).parent().siblings('.tag-manager-form').children('.rename-tag-form');
		form.toggleClass('hidden');
		$(this).toggleClass('green-btn-selected');
	});
	$('.delete').on('click', function() {
		var form2 = $(this).parent().siblings('.tag-manager-form').children('.delete-tag-form');
		form2.toggleClass('hidden');
		$(this).toggleClass('red-btn-selected');
	});
}

// Show/hide main Add GIF form
function showAddForm() {
	$('.add-gif-form-button').on('click', function() {
		$(this).toggleClass('green-btn-selected');
		$('.add-gif-form').toggleClass('hidden');
		setTimeout(function() {
			colorMainForm();
		}, 1);
	});
	$('.add-gif-form').on('click', function(e) {
		e.preventDefault();
		var target = $(e.target);
		if (target.is('#add-gif-submit')) {
			$('.loading-wrapper').toggleClass('hidden');
			$(this).children('form').submit();
		} else if (target.is('form, input, h1')) {
			// Nothing
		} else {
			$(this).toggleClass('hidden');
			$('.add-gif-form-button').toggleClass('green-btn-selected');
		}
	});
}

// Show/Hide GifGrabber form, handles logic for the submit button
function gifGrabber() {
	$('.gifgrabber-btn').on('click', function() {		
		gifGrabberAjax();
		$(this).toggleClass('red-btn-selected');
		$('.gifgrabber-form-wrapper').toggleClass('hidden');		
		setTimeout(function() {
			colorMainForm();
		}, 1);
	});
	$('.gifgrabber-form-wrapper').on('click', function(e) {
		e.preventDefault();
		var target = $(e.target);
		if (target.is('.grabber-lightbox, .grabber-expanded, .grabber-lightbox .label, .gifgrabber-submit, div.grabber-results-element-inner, div.label, div.input, .grabber-selected-gifs, .selected-gifs-number, .selected-gifs-blurb, .grabber-data-container, .grabber-data, .grabber-data-label, .suggestions, .gifgrabber-title-blurb')) {
			// Nothing
		}
		else if (target.is('.subreddit-suggestions, .suggestion, .suggestions-title, .grabber-add-gifs-btn, .grabber-inner-cancel, .grabber-inner-cancel i, .grabber-inner-cancel div, .gifgrabber-container, i, form, input, h1, select, .gifgrabber-results, #grabber-results, .grabber-results-extension, .grabber-results-title, .grabber-results-size, .grabber-results-element, .grabber-results-element img, .grabber-results-element video, .grabber-new-search, .holder, a, .message')) {
			// Nothing
		} else {			
			$(this).toggleClass('hidden');
			$('.gifgrabber-btn').toggleClass('red-btn-selected');
			gifGrabberTeardown();
		}
	});
	$('.grabber-new-search').on('click', function() {		
		gifGrabberTeardown();
	});
	$('.grabber-add-gifs-btn').on('click', function(e) {
		e.preventDefault();
		updateGrabberValues();
		if ($('#gifgrabber-values').val() === '') {
			// Nothing
		} else {
			$('.loading-wrapper').toggleClass('hidden');
			$('#grabber-add-form').submit();
		}		
	});
}

// Fades in subreddit suggestions for GifGrabber
function gifGrabberSuggestions() {
	var suggestions = ['gifs', 'gifrequests', 'makemeagif', 'physicsgifs', 'perfectloops', 'reactiongifs', 'mechanical_gifs', 'surrealgifs', 'spacegifs', 'interestinggifs', 'highqualitygifs', 'naturegifs', 'behindthegifs', 'educationalgifs', 'michaelbaygifs', 'gifextra', 'combinedgifs', 'wastedgifs'];	
	function clickSuggestions() {
		$('.suggestion').on('click', function() {
			$('.subreddit-field').val('');
			$('.subreddit-field').val($(this).text());
		});
	}
	choices = shuffle(suggestions);
	var choice1 = '<div class="suggestion animate">' + choices[0] + '</div>';
	var choice2 = '<div class="suggestion animate">' + choices[1] + '</div>';
	var choice3 = '<div class="suggestion animate">' + choices[2] + '</div>';
	var html = choice1 + choice2 + choice3;		
	$('.suggestions').fadeOut('slow', function() {
		$(this).empty();
		$(this).append(html).fadeIn('slow');
		clickSuggestions();
	});
}

// Logic for when Grabber result is clicked (hidden fields/feedback elements updated)
function clickGrabberElements(element) {
	$(element).on('click', function(e) {
		var innerElement = $(this).children('.grabber-results-element-inner');
		var isHidden = $(innerElement).hasClass('hidden');
		var target = $(e.target);
		if (target.is('.grabber-expand')) {
			// Expand the GIF
			var url = $(target).siblings('.grabber-gif').attr('src');
			var title = $(target).siblings('.grabber-results-title').text();
			grabberLightbox(url, title);
		}
		else if (target.is('.short-link, .short-link i')) {
			// Opening short-link in new tab if icon clicked
			var link = $(target).parent().attr('href');
			window.open(link, '_blank');
		}
		else if (isHidden) {
			innerElement.toggleClass('hidden');
			updateSelectedGifs();
		} else {
			if (target.is('.grabber-inner-cancel, .grabber-inner-cancel i, .grabber-inner-cancel div')) {
				innerElement.toggleClass('hidden');				
				updateGrabberValues();
				updateSelectedGifs();
			}
		}		
	});	
}

function grabberLightbox(url, title) {
	var lastPeriod = url.lastIndexOf('.');
	var extension = url.slice(lastPeriod + 1, url.length);
	if (extension === 'gif') {
		var element = '<img class="grabber-expanded" src="' + url + '">';
	} else if (extension === 'mp4') {
		var element = '<video src="' + url + '" autoplay loop class="grabber-expanded"></video>';
	}	
	var title = '<div class="label grabber-lightbox-label">' + title + '</div>';
	var html = element + title;
	$('.grabber-lightbox').append(html);
	$('.grabber-lightbox').removeClass('hidden');
	$('.grabber-lightbox').on('click', function() {
		$(this).addClass('hidden');
		$(this).empty();
	});
}

// Updates hidden input containing GifGrabber results to be sent to the DB
function updateGrabberValues() {
	var valuesInput = $('#gifgrabber-values');
	var finalValues = '';
	valuesInput.val('');
	$('.grabber-results-element-inner').each(function() {
		var isHidden = $(this).hasClass('hidden');
		if (isHidden) {
			// Nothing
		} else {
			var url = $(this).siblings('.grabber-hidden-url').val();
			var label = $(this).children('.inner-label').val();
			var tags = $(this).children('.inner-tags').val();
			var values = url + '-' + label + '-' + tags;
			finalValues += values + '|';
		}
	});
	valuesInput.val(finalValues);
}

// Function to hide/update element showing how many GifGrabber results have been selected for addition to cache by user
function updateSelectedGifs() {
	var selectedCount = 0;
	$('.grabber-results-element-inner').each(function() {
		var isHidden = $(this).hasClass('hidden');
		if (isHidden) {
			// Nothing
		} else {			
			selectedCount += 1
		}
	});
	if (selectedCount > 0) {
		$('.grabber-selected-gifs').removeClass('hidden');
		$('.selected-gifs-number').text(selectedCount);
		var color = colors[(Math.random() * (colors.length - 0 + 1) ) << 0];
		$('.selected-gifs-number').css('background-color', color);
	} else {
		$('.grabber-selected-gifs').addClass('hidden');
	}
}

// Hides form, loading screen, shows results page
function gifGrabberSetup() {
	$('#grabber-loading').addClass('hidden');
	$('.gifgrabber-form').addClass('hidden');
	$('.gifgrabber-container').addClass('gifgrabber-expanded');					
	$('.gifgrabber-results').removeClass('hidden');
}

// Hides GifGrabber results, empties divs with dynamic content
function gifGrabberTeardown() {
	console.log('Teardown!');
	$('.holder').empty();
	$('#grabber-results').empty();
	$('#grabber-error').empty();
	$('.gifgrabber-results').addClass('hidden');
	$('#grabber-error').addClass('hidden');	
	$('.gifgrabber-container').removeClass('gifgrabber-expanded');	
	$('#grabber-results').css({'min-height': '5em'});
	$('.gifgrabber-form').removeClass('hidden');	
}

// Handles AJAX call when GifGrabber form is submitted
function gifGrabberAjax() {
	$('.gifgrabber-submit').on('click', function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		gifGrabberTeardown();
		$('#grabber-add-form').addClass('hidden');
		var subreddit = $(this).siblings('.subreddit-field').val();
		var sort = $(this).siblings('.sort-field').val();
		if (subreddit === '') {
			// Nothing
		} else {	
			$('#grabber-loading').removeClass('hidden');				
			ajaxCSRF();
			$.ajax({
				url: '/u/gifgrabber/',
				type: 'POST',
				data: {
					'subreddit': subreddit,
					'sort': sort
				},
				success: function(json) {					
					var shuffledColors = shuffle(colors);
					var counter = 0;
					var allowed = ['.gifv', '.mp4', '.webm'];
					var gifNumber = '<div class="grabber-data gif-number animate" style="background-color: ' + shuffledColors[0] + '">' + json['number_gifs'] + '<div class="grabber-data-label">GIFs Found</div></div>';
					var subreddit = '<div class="grabber-data subreddit-name animate" style="background-color: ' + shuffledColors[1] + '">' + json['subreddit'] + '<div class="grabber-data-label">Subreddit</div></div>';
					var sortType = '<div class="grabber-data sort-type animate" style="background-color: ' + shuffledColors[2] + '">' + json['sort'] + '<div class="grabber-data-label">Sort</div></div>';
					var grabberData = '<div class="grabber-data-container">' + gifNumber + subreddit + sortType + '</div>';
					for (i=0; i<json['gifs'].length; i++) {					
						if ($.inArray(json['gifs'][i][1], allowed) > -1) {
							var url = json['gifs'][i][0];
							lastPeriod = url.lastIndexOf('.');
							url = url.substring(0, lastPeriod) + '.mp4';
							var img = '<video class="grabber-gif" src="' + url + '" autoplay loop></video>';
						} else {
							var img = '<img class="grabber-gif" src="' + json['gifs'][i][0] + '">';	
						}						
						var extension = '<div class="grabber-results-extension">' + json['gifs'][i][1] + '</div>';
						var title = '<div class="grabber-results-title">' + json['gifs'][i][2] + '</div>';
						var shortLink = '<a class="short-link animate-fast" href="' + json['gifs'][i][3] + '"><i class="fa fa-reddit"></i></a>';
						var expandIcon = '<i class="grabber-expand fa fa-expand animate"></i>'
						var hiddenUrl = '<input type="text" class="grabber-hidden-url hidden" value="' + json['gifs'][i][0] + '">';
						
						var innerCancel = '<div class="grabber-inner-cancel"><i class="fa fa-minus-circle"></i><div>Cancel</div></div>';
						var innerLabelInput = '<input type="text" class="gif-label-field inner-label" value="' + json['gifs'][i][2] + '">';
						var innerLabelLabel = '<div class="label">Label</div>';
						var innerTagsInput = '<input type="text" class="gif-label-field inner-tags" placeholder="Comma Separated Tags">';
						var innerTagsLabel = '<div class="label">Tags</div>';
						
						var innerHtml = '<div class="grabber-results-element-inner hidden">' + innerCancel + innerLabelInput + innerLabelLabel + innerTagsInput + innerTagsLabel + '</div>';
						var html = '<div id="grabber-gif-' + counter + '" class="grabber-results-element">' + hiddenUrl + img + extension + title + shortLink + expandIcon + innerHtml + '</div>';
						$('.grabber-results-grid').append(html);
						var elementId = '#grabber-gif-' + counter;
						clickGrabberElements(elementId);
						counter += 1
					}
					$('.grabber-data-container').empty().append(grabberData);
					gifGrabberSetup();
					if (json['gifs'].length === 0) {
						$('.grabber-results-grid').text('No GIFs found!');
					} else {
						$('#grabber-add-form').removeClass('hidden');
						$(function() {
							$('.holder').jPages({
								containerID: 'grabber-results',
								perPage: 4,
								callback: function(pages, items) {
									items.showing.find('img, video').trigger('turnPage')
									items.oncoming.find('img, video').trigger('turnPage')
								}
							});
						});
					}
				},
				error: function(xhr, errmsg, err) {
					console.log('Error!');
					console.log(errmsg);
					console.log(xhr.status + ': ' + xhr.responseText);
					var errorMsg = 'There was a problem with that subreddit, please try another';
					gifGrabberSetup();
					$('#grabber-error').removeClass('hidden');
					$('#grabber-error').text(errorMsg);
					
				}
			});
		}		
	});
}

// Adds HTML element containing full GIF and lays it on top of thumbnail
function hoverGifs() {
	$('.gif-grid-element').on({
		mouseenter: function() {
			var gif = $(this).find('.img-wrapper');
			var thumbnail = $(this).children('.gif-grid-thumbnail');
			var gifUrl = $(this).children('.display-url').val();
			// Check what kind of URL we have
			var isGfycat = gifUrl.includes('gfycat');
			var isGifv = gifUrl.lastIndexOf('.gifv') == gifUrl.length - '.gifv'.length;
			var isMp4 = gifUrl.lastIndexOf('.mp4') == gifUrl.length - '.mp4'.length;
			var isWebm = gifUrl.lastIndexOf('.webm') == gifUrl.length - '.webm'.length;
			if (isGifv || isMp4 || isWebm || isGfycat) {
				var html = '<div class="img-wrapper animate"><video src="' + gifUrl + '" autoplay loop></video></div>'
			} else {
				var html = '<div class="img-wrapper animate"><img src="' + gifUrl + '"></div>'
			}

			if ($(this).hasClass('focused') || gif.hasClass('expanded')) {
				gifExpand($(this));
			} else {
				thumbnail.css({
				'opacity': 0.0
				});
				$(this).prepend(html);
				gifExpand($(this));
			}
		},
		mouseleave: function() {
			var gif = $(this).find('.img-wrapper');
			if ($(this).hasClass('focused') || gif.hasClass('expanded')) {
				gifExpand($(this));
			} else {
				var thumbnail = $(this).children('.gif-grid-thumbnail');
				thumbnail.css({
					'opacity': 1.0
				});
				$(this).children('.img-wrapper').remove();
				gifExpand($(this));
			}
		}
	});
}

// Add focus class to GIF elements and show/hide GIF editing options
function clickGifElements(logged_in) {
	$('.gif-grid-thumbnail').on('click', function() {
		if (logged_in === 'True') {
			$(this).parent().toggleClass('focused');
			if ($(this).parent().hasClass('focused')) {
    		    $(this).parent().css({
    		        'top': '-=150px'
    		    });
    		} else {
    		   $(this).parent().css({
    		        'top': '+=150px'
    		    });
    		}
		} else {
			$(this).parent().toggleClass('focused');
		}
		var div = $(this).parent().find('.gif-form-title').children(div);
		div.toggleClass('focused');
		$(this).parent().children('.gif-form.edit-form').toggleClass('hidden');

		if ($(this).parent().hasClass('focused')) {
			var colors = ['#25B972', '#498FBD', '#ff6767', '#FFA533', '#585ec7', '#FF8359'];
			var color  = colors[Math.floor(Math.random() * colors.length)];
			$(this).parent().css({
				'background-color': color
			});
			$(this).parent().find('.gif-form-title').css({
				'background-color': color
			});
			$(this).parent().find('.gif-label').css({
				'color': 'white'
			});
		} else {
			$(this).parent().css({
				'border': 'none',
				'background-color': '#e6e6e6'
			});
			$(this).parent().find('.gif-label').css({
				'color': '#4c4c4c'
			});
		}
	});
}

// Scales up GIF once expand icon is clicked
function gifExpand(parent) {
	$(parent).find('.gif-expand').on('click', function(e) {
		$(this).siblings('.img-wrapper').toggleClass('expanded');
	});
	$(parent).find('.img-wrapper').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('expanded');
	});
}

// Displays text input containing the GIF url
function copyUrl() {
	$('.copy-url').on('click', function() {
		$(this).siblings('.gif-url').toggleClass('hidden');
	});
}

// Handles bulk tasks functionality
function bulkOperations() {
	$('.bulk-gif-button').on('click', function() {
		showBulkOptions();
		$(this).toggleClass('blue-btn-selected');
		$('.gif-grid-element').each(function() {
			$(this).children('.bulk-wrapper').toggleClass('hidden');
		});
		$('#bulk-operations').toggleClass('hidden');
		bulkSelect();
		$('#bulk-operations .submit').on('click', function() {
			grabBulkValues();
		});
	});
}

// Shows/hides various bulk task forms
function showBulkOptions() {
	$('#bulk-delete-btn').on('click', function() {
		$(this).toggleClass('red-btn-selected');
		$(this).siblings('#bulk-operations-delete').toggleClass('hidden');
	});

	$('#bulk-add-tags-btn').on('click', function() {
		$(this).toggleClass('green-btn-selected');
		$(this).siblings('#bulk-operations-add-tags').toggleClass('hidden');
	});

	$('#bulk-remove-tags-btn').on('click', function() {
		$(this).toggleClass('blue-btn-selected');
		$(this).siblings('#bulk-operations-remove-tags').toggleClass('hidden');
	});
}

// 'Selects' element by altering CSS class
function bulkSelect() {
	$('.bulk-wrapper').on('click', function() {
		$(this).children('i').toggleClass('fa-circle-o, fa-circle');
	});
}

// Scans for elements with 'selected' CSS class, records them in a text field
function grabBulkValues() {
	var ids = [];
	$('.bulk-wrapper').each(function() {
		var gifID = $(this).children('input').val();
		if ($(this).children('i').hasClass('fa-circle')) {
			ids.push(gifID);
		} else {
			// Nothing
		}
	});
	$('#bulk-operations').find('.bulk-values').each(function(){
		$(this).val(ids.join());
	});
}

// Records tag ID in text field, applies CSS class for UX feedback
function selectTagToRemove() {
	$('.tag').children('.delete-tag').on('click', function() {
		var tagName = $(this).siblings('.tag-name').text();
		var selected = $(this).siblings('.remove-tag-input').val();
		if (selected == tagName) {
			$(this).parent().removeClass('warning');
			$(this).removeClass('icon-selected');
			$(this).siblings('.remove-tag-input').val(' ');
			updateTagRemoveInput($(this).parents('.tags'));
		} else if (selected == ' ') {
			$(this).parent().addClass('warning');
			$(this).addClass('icon-selected');
			$(this).siblings('.remove-tag-input').val(tagName);
			updateTagRemoveInput($(this).parents('.tags'));
		}
	});
}

// Updates hidden text field with tags to remove
function updateTagRemoveInput(element) {
	values = [];
	$(element).find('.remove-tag-input').each(function() {
		value = $(this).val();
		values.push(value);
	});
	$(element).find('.remove-tags-values').val(values);
}

// Displays a form to add tags
function addTags() {
	$('.add-tags-title').on('click', function(e) {
		e.stopPropagation();
		var clicked = Number($(this).children('input').val());
		if (clicked) {
			$(this).removeClass('add-tags-selected');
			$(this).children('input').val(0);
			$(this).siblings('.add-tag-field').remove();
			$(this).siblings('.add-tag-submit').remove();
		} else {
			$(this).addClass('add-tags-selected');
			$(this).children('input').val(1);
			var html = '<input class="add-tag-field" maxlength="20" type="text" placeholder="tag"><div class="add-tag-submit btn blue-btn">Add</div>';
			$(this).parent().append(html);
			addTagSubmit($(this).siblings('.add-tag-submit'));
		}
	});
}

// Places tag into staging area to be submitted
function addTagSubmit(element) {
	$(element).on('click', function() {
		var tag = $(element).siblings('.add-tag-field').val();
		if (tag.length > 0) {
			$(this).siblings('.tags-to-be-added').removeClass('hidden');
			var currentVal = $('.add-tags-values').val();
			var html = '<div class="tag-to-be-added"><i class="fa fa-trash-o delete-tag"></i><div class="tag-to-be-added-value">' + tag + '</div></div>';
			$(this).siblings('.tags-to-be-added').append(html);
			$(this).siblings('.add-tag-field').val('');
			var tagsToBeAddedDiv = $(this).siblings('.tags-to-be-added');
			updateAddTagInput(tagsToBeAddedDiv);
			removeAddedTag(tagsToBeAddedDiv);
		}
	});
}

// Removes tag from staging area
function removeAddedTag(element) {
	var deleteIcon = $(element).children('.tag-to-be-added').children('.delete-tag');
	$(deleteIcon).on('click', function() {
		$(this).siblings('.tag-to-be-added-value').text('');
		updateAddTagInput(element);
		$(this).parent().remove();
		var tagsToAdd = $(element).children().length;
		if (tagsToAdd > 1) {
			// Nothing
		} else {
			$(element).addClass('hidden');
		}
	});
}

// Updates hidden text field with tags to add
function updateAddTagInput(element) {
	var tagValues = $(element).children('.tag-to-be-added').children('.tag-to-be-added-value');
	var tagValuesInput = $(element).parent().siblings('.add-tags-values');
	values = [];
	$(tagValues).each(function() {
		value = $(this).text();
		values.push(value);
	});
	$(tagValuesInput).val(values);
}

// Fades in fixed inner nav bar below a certain height
function showInnerNav() {
	$(document).on('scroll', function() {
		var scroll = $(document).scrollTop();
		if (scroll > 390) {
			$('.inner-nav').addClass('inner-nav-fixed');
		} else {
			$('.inner-nav').removeClass('inner-nav-fixed');
		}
	});
}

// Show/hide the Delete Profile form
function deleteProfile() {
	$('.delete-profile-button').on('click', function() {
		$(this).siblings('.edit-profile-delete-wrapper').toggleClass('hidden');
	});
	$('.cancel-delete-profile').on('click', function() {
		$(this).parents('.edit-profile-delete-wrapper').toggleClass('hidden');
	});
}

// Hides/shows party mode wrapper, starts/stop background change interval
function partyModeToggle() {
	$('.party-mode-icon').on('click', function() {
		console.log('PARTY MODE ENGAGED');
		var partyColor = randomColor({format: 'rgb'});
		var rgba = partyColor.slice(0, 3) + 'a' + partyColor.slice(3, partyColor.length - 1) + ', 0.8)';
		$('.party-mode-wrapper').css('background-color', rgba);
		$('.party-mode-wrapper').removeClass('hidden');
		partyMode($(this).parents('.tag-group'));
		var backgroundChange = setInterval(function() {
			var partyColor = randomColor({format: 'rgb'});
			var rgba = partyColor.slice(0, 3) + 'a' + partyColor.slice(3, partyColor.length - 1) + ', 0.8)';			
			$('.party-mode-wrapper').css('background-color', rgba);
		}, 1500);
		$('.party-mode-cancel').on('click', function() {
			console.log('PARTY MODE DISENGAGED');
			$('.party-mode-wrapper').addClass('hidden');
			$('.party-mode-container').empty();
			clearInterval(backgroundChange);
		});
	});	
}

function partyMode(tagGroup) {
	var html = '';
	// Grab Display URLs from .gif-grid-elements inside .tag-group
	$(tagGroup).children('.gif-grid-element').each(function() {
		var url = $(this).children('.display-url').val();
		var lastPeriod = url.lastIndexOf('.');
		var extension = url.slice(lastPeriod + 1, url.length);
		if (extension === 'gif') {
			var element = '<div class="party-img-wrapper"><img src="' + url + '" class="animate"></div>';
		} else if (extension === 'mp4') {
			var element = '<div class="party-img-wrapper"><video src="' + url + '" autoplay loop class="animate"></video></div>';
		}
		html += element;
	});
	$('.party-mode-container').append(html);
	$('.party-mode-container').children('.party-img-wrapper').each(function() {
		animateDiv($(this));
	});
}

// Gif Party Animation Functions below
function makeNewPosition($content) {
	// Get viewport dimensions (remove the dimension of the div)
	var h = $content.height() - 400;
	var w = $content.width() - 300;

	var nh = Math.floor(Math.random() * h);
	var nw = Math.floor(Math.random() * w);

	return [nh, nw];
}

function calcSpeed(prev, next) {
	var x = Math.abs(prev[1] - next[1]);
	var y = Math.abs(prev[0] - next[0]);
	var greatest = x > y ? x : y;
	var speedModifier = 0.1;
	var speed = Math.ceil(greatest / speedModifier);

	return speed;
}

function animateDiv($target) {
	var newq = makeNewPosition($target.parent());
	var oldq = $target.position();
	var speed = calcSpeed([oldq.top, oldq.left], newq);
	
	$target.animate({
		top: newq[0],
		left: newq[1]
	}, speed, function () {
		animateDiv($target);
	});
}

// Credit to WearProtection.js || https://gist.github.com/broinjc
function ajaxCSRF() {
	 // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}