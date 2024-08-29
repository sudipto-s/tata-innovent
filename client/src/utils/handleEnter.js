import $ from "jquery"

export const handleEnter = (e, target = ".btn-enter") => {
   if (e.key === 'Enter') {
      if(!e.target.value?.trim()) {
         alert("Enter data to continue..")
         return
      }
      e.preventDefault();
      e.target.blur()
      $(target).trigger("click");
   }
}