document.addEventListener("DOMContentLoaded", function() {
    // Menu Trigger
    let menuTrigger = document.getElementById("menu-nav");
    let showElement = document.querySelector(".main-nav-wrapper");

    // Sub-Menu Trigger
    let subMenuTrigger = document.getElementById("sub-menu-trigger");
    let subMenu = document.querySelector(".sub-menu");
    let subMenuIcon = subMenuTrigger.querySelector("i.fa-angle-down");

    // Menu Close
    let close = document.getElementById("closeMenu");

    menuTrigger.addEventListener("click", () => {
        showElement.classList.add("showMenu");
    });

    close.addEventListener("click", () => {
        showElement.classList.remove("showMenu");
    });

    subMenuTrigger.addEventListener("click", () => {
        subMenu.classList.toggle("showSubMenu");
        subMenuIcon.classList.toggle("rotateIcon"); // Toggle icon rotation
    });
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("proposal-btn").addEventListener('click', () => {
      document.getElementById("dm-proposal-wrapper").classList.toggle('proposalBox');
  });

  document.getElementById("proposal-link").addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById("dm-proposal-wrapper").classList.remove('proposalBox');
  });
});



// Digital Marketing Page Faq

// Get all FAQ triggers
document.addEventListener("DOMContentLoaded", function() {
  let dmfaqTriggers = document.querySelectorAll(".dm-faq-item");
  let currentlyOpen = null;

  dmfaqTriggers.forEach(dmfaqTrigger => {
      dmfaqTrigger.addEventListener("click", () => {
          const description = dmfaqTrigger.querySelector(".dm-faq-desc");

          if (currentlyOpen !== dmfaqTrigger) {
              if (currentlyOpen !== null) {
                  currentlyOpen.classList.remove("dmfaqTrigger");
                  currentlyOpen.querySelector(".dm-faq-desc").classList.add("hidden");
              }
              currentlyOpen = dmfaqTrigger;
              dmfaqTrigger.classList.add("dmfaqTrigger");
              description.classList.remove("hidden");
          } else {
              dmfaqTrigger.classList.remove("dmfaqTrigger");
              description.classList.add("hidden");
              currentlyOpen = null;
          }
      });
  });
});




// Recent Task
let sWebDList = document.querySelectorAll(".s-web-d");
let recentBoxDisplayList = document.querySelectorAll(".recent-box-display");

const updateDisplayVisibility = (element, isVisible) => {
    if (isVisible) {
        element.classList.add("show");
    } else {
        element.classList.remove("show");
    }
};

sWebDList.forEach((sWebD, index) => {
    sWebD.addEventListener("mouseover", () => {
        updateDisplayVisibility(recentBoxDisplayList[index], true);
    });

    sWebD.addEventListener("mouseout", (event) => {
        if (!recentBoxDisplayList[index].contains(event.relatedTarget)) {
            updateDisplayVisibility(recentBoxDisplayList[index], false);
        }
    });

    recentBoxDisplayList[index].addEventListener("mouseover", () => {
        updateDisplayVisibility(recentBoxDisplayList[index], true);
    });

    recentBoxDisplayList[index].addEventListener("mouseout", (event) => {
        if (!sWebD.contains(event.relatedTarget)) {
            updateDisplayVisibility(recentBoxDisplayList[index], false);
        }
    });
});


///Reference: 
//https://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
;(function($) {

    // Browser supports HTML5 multiple file?
    var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
        isIE = /msie/i.test( navigator.userAgent );

    $.fn.customFile = function() {

      return this.each(function() {

        var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
            $wrap = $('<div class="file-upload-wrapper">'),
            $input = $('<input type="text" class="file-upload-input" placeholder="Your project details." />'),
            // Button that will be used in non-IE browsers
            $button = $('<button type="button" class="file-upload-button"><i class="fa-solid fa-paperclip"></i></button>'),
            // Hack for IE
            $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Select a File</label>');

        // Hide by shifting to the left so we
        // can still trigger events
        $file.css({
          position: 'absolute',
          left: '-9999px'
        });

        $wrap.insertAfter( $file )
          .append( $file, $input, ( isIE ? $label : $button ) );

        // Prevent focus
        $file.attr('tabIndex', -1);
        $button.attr('tabIndex', -1);

        $button.click(function () {
          $file.focus().click(); // Open dialog
        });

        $file.change(function() {

          var files = [], fileArr, filename;

          // If multiple is supported then extract
          // all filenames from the file array
          if ( multipleSupport ) {
            fileArr = $file[0].files;
            for ( var i = 0, len = fileArr.length; i < len; i++ ) {
              files.push( fileArr[i].name );
            }
            filename = files.join(', ');

          // If not supported then just take the value
          // and remove the path to just show the filename
          } else {
            filename = $file.val().split('\\').pop();
          }

          $input.val( filename ) // Set the value
            .attr('title', filename) // Show filename in title tootlip
            .focus(); // Regain focus

        });

        $input.on({
          blur: function() { $file.trigger('blur'); },
          keydown: function( e ) {
            if ( e.which === 13 ) { // Enter
              if ( !isIE ) { $file.trigger('click'); }
            } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
              // On some browsers the value is read-only
              // with this trick we remove the old input and add
              // a clean clone with all the original events attached
              $file.replaceWith( $file = $file.clone( true ) );
              $file.trigger('change');
              $input.val('');
            } else if ( e.which === 9 ){ // TAB
              return;
            } else { // All other keys
              return false;
            }
          }
        });

      });

    };

    // Old browser fallback
    if ( !multipleSupport ) {
      $( document ).on('change', 'input.customfile', function() {

        var $this = $(this),
            // Create a unique ID so we
            // can attach the label to the input
            uniqId = 'customfile_'+ (new Date()).getTime(),
            $wrap = $this.parent(),

            // Filter empty input
            $inputs = $wrap.siblings().find('.file-upload-input')
              .filter(function(){ return !this.value }),

            $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

        // 1ms timeout so it runs after all other events
        // that modify the value have triggered
        setTimeout(function() {
          // Add a new input
          if ( $this.val() ) {
            // Check for empty fields to prevent
            // creating new inputs when changing files
            if ( !$inputs.length ) {
              $wrap.after( $file );
              $file.customFile();
            }
          // Remove and reorganize inputs
          } else {
            $inputs.parent().remove();
            // Move the input so it's always last on the list
            $wrap.appendTo( $wrap.parent() );
            $wrap.find('input').focus();
          }
        }, 1);

      });
    }

}(jQuery));

$('input[type=file]').customFile();




// SMM Page Scroll


