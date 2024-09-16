jQuery(document).ready( function($) {

	//set our domain as a variable
	var domainString = document.domain;
	
        //select each anchor whose href begins "http://"
        //this excludes relative urls and urls like "mailto:"
	$('a[href^="http://"]').each(function() {
	
		//set url's href as a variable
		var url = $(this).attr('href');
		
		//if url does not contain our domain name
		if ( url.indexOf( domainString ) == -1 ) {
			
                        //add onclick tracking event
			$( this ).attr( 'onClick', '_gaq.push(["_trackEvent","Outbound Links","Click","'+url+'"])' );
		
		} 
	});
});