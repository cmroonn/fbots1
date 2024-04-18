"use strict";

document.addEventListener("DOMContentLoaded", function () {
  try {
    IMask(document.getElementById('phone-mask'), {
      mask: '+{7}(000)000-00-00'
    });
  } catch (e) {
    console.log(e);
  }
  
  try {
    var elSelectNative = document.querySelector(".js-selectNative");
    var elSelectCustom = document.querySelector(".js-selectCustom");
    var elSelectCustomBox = elSelectCustom.children[0];
    var elSelectCustomOpts = elSelectCustom.children[1];
    var customOptsList = Array.from(elSelectCustomOpts.children);
    var optionsCount = customOptsList.length;
    var defaultLabel = elSelectCustomBox.getAttribute("data-value");
    var optionChecked = "";
    var optionHoveredIndex = -1;
  
    // Toggle custom select visibility when clicking the box
    elSelectCustomBox.addEventListener("click", function (e) {
      var isClosed = !elSelectCustom.classList.contains("isActive");
      if (isClosed) {
        openSelectCustom();
      } else {
        closeSelectCustom();
      }
    });
    function openSelectCustom() {
      elSelectCustom.classList.add("isActive");
      if (optionChecked) {
        var optionCheckedIndex = customOptsList.findIndex(function (el) {
          return el.getAttribute("data-value") === optionChecked;
        });
        updateCustomSelectHovered(optionCheckedIndex);
      }
  
      // Add related event listeners
      document.addEventListener("click", watchClickOutside);
      document.addEventListener("keydown", supportKeyboardNavigation);
    }
    function closeSelectCustom() {
      elSelectCustom.classList.remove("isActive");
      elSelectCustom.setAttribute("aria-hidden", true);
      updateCustomSelectHovered(-1);
  
      // Remove related event listeners
      document.removeEventListener("click", watchClickOutside);
      document.removeEventListener("keydown", supportKeyboardNavigation);
    }
    function updateCustomSelectHovered(newIndex) {
      var prevOption = elSelectCustomOpts.children[optionHoveredIndex];
      var option = elSelectCustomOpts.children[newIndex];
      if (prevOption) {
        prevOption.classList.remove("isHover");
      }
      if (option) {
        option.classList.add("isHover");
      }
      optionHoveredIndex = newIndex;
    }
    function updateCustomSelectChecked(value, text) {
      var prevValue = optionChecked;
      var elPrevOption = elSelectCustomOpts.querySelector("[data-value=\"".concat(prevValue, "\""));
      var elOption = elSelectCustomOpts.querySelector("[data-value=\"".concat(value, "\""));
      if (elPrevOption) {
        elPrevOption.classList.remove("isActive");
      }
      if (elOption) {
        elOption.classList.add("isActive");
      }
      elSelectCustomBox.textContent = text;
      optionChecked = value;
    }
    function watchClickOutside(e) {
      var didClickedOutside = !elSelectCustom.contains(e.target);
      if (didClickedOutside) {
        closeSelectCustom();
      }
    }
    function supportKeyboardNavigation(e) {
      // press down -> go next
      if (e.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
        var index = optionHoveredIndex;
        e.preventDefault(); // prevent page scrolling
        updateCustomSelectHovered(optionHoveredIndex + 1);
      }
  
      // press up -> go previous
      if (e.keyCode === 38 && optionHoveredIndex > 0) {
        e.preventDefault(); // prevent page scrolling
        updateCustomSelectHovered(optionHoveredIndex - 1);
      }
  
      // press Enter or space -> select the option
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        var option = elSelectCustomOpts.children[optionHoveredIndex];
        var value = option && option.getAttribute("data-value");
        if (value) {
          elSelectNative.value = value;
          updateCustomSelectChecked(value, option.textContent);
        }
        closeSelectCustom();
      }
  
      // press ESC -> close selectCustom
      if (e.keyCode === 27) {
        closeSelectCustom();
      }
    }
  
    // Update selectCustom value when selectNative is changed.
    elSelectNative.addEventListener("change", function (e) {
      var value = e.target.value;
      var elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll("[data-value=\"".concat(value, "\"]"))[0];
      updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
    });
  
    // Update selectCustom value when an option is clicked or hovered
    customOptsList.forEach(function (elOption, index) {
      elOption.addEventListener("click", function (e) {
        var value = e.target.getAttribute("data-value");
  
        // Sync native select to have the same value
        elSelectNative.value = value;
        updateCustomSelectChecked(value, e.target.textContent);
        closeSelectCustom();
      });
      elOption.addEventListener("mouseenter", function (e) {
        updateCustomSelectHovered(index);
      });
  
      // TODO: Toggle these event listeners based on selectCustom visibility
    });
  } catch(e) {
    console.log(e);
  }

  try {
    const btns = document.querySelectorAll('.accounts__row__btn');
    btns.forEach(function(el) {
      el.addEventListener('click', function(e) {
        const parent = el.closest('.accounts__row');
        const block = parent.querySelector('.accounts__row__body');
        block.classList.toggle("active");
      });
    })

  } catch(e) {
    console.log(e);
  }

  try {
    const burgerBtn = document.querySelector('.mob-menu__burger');
    const closeBtn = document.querySelector('.mob-menu-plate__close');
    const menu = document.querySelector('.mob-menu-plate');
    const overlay = document.querySelector('.overlay');

    burgerBtn.addEventListener("click", function(e) {
      menu.classList.add('active');
      overlay.classList.add('active');
    });

    closeBtn.addEventListener("click", function(e) {
      menu.classList.remove('active');
      overlay.classList.remove('active');
    });

  } catch(e) {
    console.log(e);
  }
});


$(window).keyup(function(e){
	var target = $('.checkbox-ios input:focus');
	if (e.keyCode == 9 && $(target).length){
		$(target).parent().addClass('focused');
	}
});
 
$('.checkbox-ios input').focusout(function(){
	$(this).parent().removeClass('focused');
});