(function ($) {

var URL = document.location.href;
var campaignType, brand, division, portfolio, targetingType, environment, placement, campaignName;

// get active values
function getSelectedValues() {    
    campaignType = $('#campaignType .switch.active').attr('value'),
    brand = $('#brand .switch.active').attr('value'),
    division = $('#division .switch.active').attr('value'),
    portfolio = $('#portfolio .switch.active').attr('value'),
    targetingType = $('#targeting .switch.active').attr('value'),
    environment = $('#environment .switch.active').attr('value'),
    campaignName = $('#campaignName').val();
}

// update toggles for placement and environment sections
function updateOptions() {

    getSelectedValues();

    //update environment options
    $('#environment .switch').each(function(){
        $(this).addClass('hide').removeClass('show');
        var envEligibleTypes = $(this).attr('type'),
        envEligbleBrands = $(this).attr('brand');
        if ((envEligibleTypes.indexOf(campaignType) > -1) && (envEligbleBrands.indexOf(brand) > -1)){
            $(this).addClass('show').removeClass('hide');
        }
    });

    checkIfNoActiveSwitch();
    getSelectedValues();

    //update placement options
    $('#placement-section .toggle').each(function(){
        $(this).addClass('hide').removeClass('show');
        var placeEligibleTypes = $(this).attr('type'),
        placeEligibleBrands = $(this).attr('brand'),
        placeEligibleEnvs = $(this).attr('env');
        if ((placeEligibleTypes.indexOf(campaignType) > -1) && (placeEligibleBrands.indexOf(brand) > -1) && (placeEligibleEnvs.indexOf(environment) > -1)) {
            $(this).addClass('show').removeClass('hide');
        }
    });

    //show or hide targeting type
    if (($("#campaignType .active").attr('value') == "TG") || ($("#campaignType .active").attr('value') == "NB")) {
        $("#targeting-section").addClass('show').removeClass('hide');
    } else {
        $("#targeting-section").addClass('hide').removeClass('show');
    }

    //show or hide placement
    if ($('#placement .show').length > 0) {
        $("#placement-section").addClass('show').removeClass('hide');
    } else {
        $("#placement-section").addClass('hide').removeClass('show');
    }

}

function checkIfNoActiveSwitch() {
    // check if from shown toggles there is none active - if so, make first available option active
    $('.switch-group').each(function(){
        if ($(this).children('.switch.show').length > 0 && $(this).children('.switch.show.active').length == 0) {
            $(this).children('.switch').removeClass('active');
            $(this).children('.switch.show').eq(0).addClass('active');
        }
    });  
}

function updatePrefix() {

    updateOptions();
    getSelectedValues();

    $('#placement-section .toggle:contains("Portfolio Page")').attr('value','P'+portfolio);

    placement = '';
    if (environment == "A" || environment == "S") {
        var placementItem = [];
        $('#placement-section .toggle.show.active').each(function(){placementItem.push($(this).attr('value'))});
        if ($('#placement-section').hasClass('hide')){
            var placement = '';
        } else {
            var placement = "_"+placementItem.join('-');
        }
    }

    if (campaignType != 'TG' && campaignType != 'NB'){targetingType = '';} else {targetingType = '-'+targetingType;}
    if ($('#placement-section .toggle.show').length > 0 && (placement == "_" || placement =='')){$('#prefix').val('Placement can\'t be empty!')} else {
        var prefix = campaignType+'-'+brand+'-'+division+'-'+portfolio+targetingType+'-'+environment+placement+': '+campaignName;
        $('#prefix').val(prefix);
    }
}

function getTargetName() {
    if (URL.indexOf('/browse/BUSDIGRUN') > -1 || URL.indexOf('/browse/DCV') > -1 || URL.indexOf('/browse/BWEP') > -1){
        var jiraKey = $('.aui-nav-breadcrumbs li:last').text().replace('-','_');
        var summaryText = $('#summary-val').text();
        if (jiraKey.length > 0 && summaryText.length > 0) {
            $('#targetName').val(jiraKey+'-'+summaryText);
        }
    }
}

if (URL.indexOf('digital.westpacgroup.com.au') > -1 || URL.indexOf('jira.srv.westpac.com.au') > -1) {

    if ($('#jiraHelper').length > 0){

        $('#jiraHelper').css('display','block');
        getTargetName();

    } else {

                alreadySelected = true;
         $('body').prepend('<div id="jiraHelper"><div class="modal-content"><span class="close">&times;</span><h2>CRO Campaign Namer</h2><div><h3>Name for</h3><div class="switch-group" id="namingType"><div class="switch active">JIRA</div><div class="switch">Target</div></div></div><div id="jiraElements"><div><h3>Campaign type</h3><div class="switch-group" id="campaignType"><div class="switch show active" value="TS">A/B Test</div><div class="switch show" value="TG">Targeting</div><div class="switch show" value="PN">Personalisation</div><div class="switch show" value="NB">NBA</div><div class="switch show" value="SP">Support</div></div></div><div class="hide" id="targeting-section"><h3>Targeting type</h3><div class="switch-group" id="targeting"><div class="switch show active" value="CM">Campaign</div><div class="switch show" value="QS">Quality sale</div><div class="switch show" value="AA">App abandonment</div><div class="switch show" value="ON">Onboarding</div><div class="switch show" value="PM">Product maturity</div><div class="switch show" value="OB">Onsite behavioural</div><div class="switch show" value="DA">Digitally active</div><div class="switch show" value="DD">Digital adoption</div><div class="switch show" value="PR">Propensity</div></div></div><div><h3>Brand</h3><div class="switch-group" id="brand"><div class="switch show active" value="WBC">Westpac</div><div class="switch show" value="STG">St George</div><div class="switch show" value="BOM">BOM</div><div class="switch show" value="BSA">BSA</div><div class="switch show" value="SBG">SBG</div><div class="switch show" value="BT">BT</div></div></div><div><h3>Division</h3><div class="switch-group" id="division"><div class="switch show active" value="C">Consumer</div><div class="switch show" value="B">Business</div></div></div><div><h3>Portfolio</h3><div class="switch-group" id="portfolio"><div class="switch show active" value="TR">Transactions</div><div class="switch show" value="SA">Savings</div><div class="switch show" value="CC">Credit cards</div><div class="switch show" value="BL">Business loans</div><div class="switch show" value="PL">Personal loans</div><div class="switch show" value="TD">Term deposits</div><div class="switch show" value="FC">FCA</div><div class="switch show" value="FX">Foreign exchange</div><div class="switch show" value="WW">WWW</div><div class="switch show" value="MR">Merchants</div><div class="switch show" value="HL">Home loans</div><div class="switch show" value="IN">Insurance</div><div class="switch show" value="WL">Wealth</div><div class="switch show" value="SU">Super</div><div class="switch show" value="BI">Biz Invoice</div><div class="switch show" value="SR">Service</div><div class="switch show" value="SRA">Digital Adoption and Retention</div><div class="switch show" value="SRE">Paper Free-Estatement</div><div class="switch show" value="SRT">Digital Engagement Trains</div><div class="switch show" value="SRP">Digital Proposition</div><div class="switch show" value="NA">Generic</div></div></div><div><h3>Environment</h3><div class="switch-group" id="environment"><div brand="WBC-STG-BOM-BSA-SBG-BT" class="switch show active" type="TS-TG-PN-SP" value="P">Public</div><div brand="WBC" class="switch show" type="TG" value="A">Mobile App</div><div brand="WBC-STG-BOM-BSA-SBG" class="switch show" type="TS-PN-NB-SP" value="S">Secure</div></div></div><div brand="WBC-STG-BOM-BSA-SBG" class="hide" env="A-S" id="placement-section" type="TG-NB"><h3>Placement</h3><div class="switch-group toggle-group" id="placement"><div brand="WBC" class="toggle active" env="A" type="TG" value="SIM">Sign-in Marketing</div><div brand="WBC" class="toggle" env="A" type="TG" value="SIP">Products Nav</div><div brand="WBC" class="toggle" env="A" type="TG" value="SIS">Services Nav</div><div brand="WBC" class="toggle" env="A" type="TG" value="SOM">Sign-out Marketing</div><div brand="WBC" class="toggle" env="A" type="TG" value="SOS">Sign-out Service</div><div brand="WBC" class="toggle" env="A" type="TG" value="SOP">Push Notification</div><div brand="WBC-STG-BOM-BSA-SBG" class="toggle" env="S" type="NB" value="SLT">Sales-Trigger</div><div brand="WBC-STG-BOM-BSA-SBG" class="toggle" env="S" type="NB" value="SLP">Sales-Propensity</div><div brand="WBC-STG-BOM-BSA-SBG" class="toggle" env="S" type="NB" value="SRT">Service-Trigger</div><div brand="WBC-STG-BOM-BSA-SBG" class="toggle" env="S" type="NB" value="SRP">Service-Propensity</div><div brand="WBC-STG-BOM-BSA-SBG" class="toggle" env="S" type="NB" value="OTH">Other</div></div></div><div><h3>Description</h3><div class="output"><input id="campaignName"/></div></div><div><h3>Ticket name</h3><div class="output"><input id="prefix"/><div class="copyClipboard">Copy to clipboard</div></div></div></div><div id="targetElements" style="display: none;"><div id="targetMessage" style="clear: both; padding-top: 40px;"><p>To obtain the Target campaign name,click on this bookmark from the JIRA ticket for this campaign(appropriately named using this bookmark).</p></div><div><h3>Target name</h3><div class="output"><input id="targetName"/><div class="copyClipboard">Copy to clipboard</div></div></div></div><div id="footer-section"></div></div></div><style>#jiraHelper{position:fixed;z-index:5000;height:100%;width:100%;background-color:rgba(0,0,0,0.4)}.modal-content{background-color:#fefefe;padding:15px 25px 32px 40px;border:1px solid #888;width:75%;max-width:1200px;margin:40px auto 0 auto}#jiraHelper.close{color:#aaa;float:right;font-size:28px;font-weight:bold}#jiraHelper.close:hover,#jiraHelper.close:focus{color:black;text-decoration:none;cursor:pointer}#jiraHelper h2{margin-bottom:20px;margin-top:16px}.switch-group{padding-top:8px;padding-bottom:10px;float:left;display:table-cell;width:85%}.switch,.toggle,.copyClipboard{color:#848484;font-size:11px;padding:7px 10px 7px 10px;width:96px;text-align:center;cursor:pointer;background:#efefef;float:left;border:1px solid #d4d4d4}.copyClipboard{margin-top:10px}.switch:first-child{border-top-left-radius:2px;border-bottom-left-radius:2px}.switch:last-child{border-top-right-radius:2px;border-bottom-right-radius:2px}.switch.active,.toggle.active{background:#621a4b;color:#ffffff;border:1px solid #621a4b}#jiraHelper h3{font-size:14px;padding-top:15px;clear:both;float:left;display:table-cell;width:15%}#jiraHelper input{font-size:12px;padding:7px 10px 7px 10px;width:375px;float:left;border:1px solid #d4d4d4;margin-top:10px;margin-bottom:10px}#jiraHelper.output{margin-top:10px;margin-bottom:40px}#footer-section{clear:both;float:none;padding-top:15px}.hide{display:none}.show{display:block}</style>');

        $('#jiraElements .switch').click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            updatePrefix();          
        });

        $('#jiraElements .toggle').click(function(){
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }       
            updatePrefix();        
        });


        $('#namingType .switch').click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            if ($('#namingType .switch.active').text() == "JIRA") {
                $('#jiraElements').css('display','');
                $('#targetElements').css('display','none');
            } else {
                $('#jiraElements').css('display','none');
                $('#targetElements').css('display','');
                getTargetName();            
            }
        });

        $('#campaignName').keyup(function(){updatePrefix();});

        $('.copyClipboard').click(function(){
            var copyText = $(this).siblings('input');
            copyText.select();
            document.execCommand("copy");
        });

        $('.close').click(function(){$('#jiraHelper').css('display','none');});

        updatePrefix();

        getTargetName();

    }

} else {
    alert('Oops! You can only use this tool while in JIRA.');
}

})(jQuery);
