# The following parameters influence jsModal's behaviour: #

  * width: 'auto',
  * height: 'auto',
  * lock: false,
  * hideclose: false,
  * draggable: false





# **content:** #

Define which content you wish to display in the modal.
For example:

`Modal.open({ content: '<p>Hello World!</p>' });`

You can even define a variable before declaring jsModal and setting it as the content, like so:

`var myContent = getElementById('foo-bar').innerHTML;`

`Modal.open({ content: myContent });`


You can even use it together with a library such as jQuery, like so:

`Modal.open({ content: $('#foo-bar').html() });`




# **ajaxContent:** #
You can specify jsModal to load a file (located on the same server), like this:
**Modal.open({ ajaxContent: 'ajax-example.html' });**

Note that you can only use one of the content parameters at a time. i.e. you can not have both **content:** and **ajaxContent:** in the same modal instance.



# **width:** and **height:** #

Provide the value and format (px, em, % etc.), otherwise, the default will set it to **'auto'**.




# **lock:** #

Include and set this to **true** in order to create an inescapable modal.

This is good for license agreements, or verifications.

In order to close the modal, you will have to call:
**Modal.close();**

If you exclude this parameter, its default will be **false**.




# **hideclose:** #

Does exactly what its name suggests - hides the close graphic and subsequently the ability to close the modal by clicking on the close graphic.

Clicking the overlay or pressing the escape key will still exit the modal.

If excluded, the default is **false** and the close graphic will be visible.




# **draggable:** #

You may wish to have draggable modals, and to achieve this, set **draggable:** to **true**.

The default is **false**.




# **closeAfter:** #

Setting this makes the modal close after the time value (in seconds).
For example: **closeAfter: 3.5,** will cause the modal to close after 3½ seconds.




# **openCallback:** and **closeCallback:** #

With this you can pass a function to be called upon opening or closing of the modal.





# **hideOverlay:** #

Set this to **true** and no overlay will be displayed.


**- END OF PARAMETERS**