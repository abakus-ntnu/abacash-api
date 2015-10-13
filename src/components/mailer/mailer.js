import config from '../../config/environment';
import nodemailer from 'nodemailer';
import ses from 'nodemailer-ses-transport';

var templatesDir   = config.root+'/server/components/mailer/templates';
var emailTemplates = require('email-templates')

var transporter = nodemailer.createTransport(ses({
    accessKeyId: config.aws.smtp.accessKeyId,
    secretAccessKey: config.aws.smtp.secretAccessKey,
    region: config.aws.smtp.region
}));


exports.invite = function(user){
	console.log(user);
	emailTemplates(templatesDir, function(err, template) {
		console.log(template)
	  	if (err) {
	    	console.log(err);
	  	} else {
	  		user.invitelink = config.domain+'/invite/'+user.meta.invite;
	    	template('invite', user, function(err, html, text) {
	      	if (err) {
	        	console.log(err);
	      	} else {
	        	transporter.sendMail({
		      		from: 'Sonnico CRM <Kristoffer@Larsen.so>',
		      		to: user.email,
		      		subject: 'Innvitasjon',
		      		html: html,
		      		text: text
		    		}, function(err, responseStatus) {
		          		if (err) {
		            		console.log(err);
		          		} else {
		            		console.log(responseStatus.message);
		         	 	}
		        	});
		      	}
		    });
		}
	});
}

exports.restore = function(user){
	emailTemplates(templatesDir, function(err, template) {
	  	if (err) {
	    	console.log(err);
	  	} else {
	  		user.restoreLink = config.domain+'/login/reset/'+user.meta.restore;
	    	template('restore', user, function(err, html, text) {
	      	if (err) {
	        	console.log(err);
	      	} else {
	        	transporter.sendMail({
		      		from: 'Sonnico CRM <Kristoffer@Larsen.so>',
		      		to: user.email,
		      		subject: 'Passord reset',
		      		html: html,
		      		text: text
		    		}, function(err, responseStatus) {
		          		if (err) {
		            		console.log(err);
		          		} else {
		            		console.log(responseStatus.message);
		         	 	}
		        	});
		      	}
		    });
		}
	});
}

 
