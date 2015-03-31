(function(){TS.registerModule("client.channel_page",{onStart:function(){TS.client.login_sig.add(d);
TS.client.flexpane_display_switched_sig.add(y);
TS.channels.data_updated_sig.add(H);
TS.channels.switched_sig.add(w);
TS.channels.purpose_changed_sig.add(x);
TS.channels.member_left_sig.add(t);
TS.channels.member_joined_sig.add(t);
TS.channels.renamed_sig.add(g);
TS.groups.switched_sig.add(w);
TS.groups.purpose_changed_sig.add(x);
TS.groups.member_left_sig.add(F);
TS.groups.member_joined_sig.add(F);
TS.groups.renamed_sig.add(g);
TS.ims.switched_sig.add(w);
TS.members.presence_changed_sig.add(r);
TS.members.changed_name_sig.add(r);
TS.members.changed_profile_sig.add(r);
TS.members.changed_account_type_sig.add(r);
TS.members.changed_deleted_sig.add(l);
TS.prefs.display_real_names_override_changed_sig.add(k);
TS.prefs.team_display_real_names_changed_sig.add(k);
TS.files.team_file_added_sig.add(P);
TS.files.team_file_deleted_sig.add(P);
TS.files.team_file_changed_sig.add(P);
TS.files.team_file_comment_edited_sig.add(L);
TS.pins.pinned_status_changed_sig.add(C);
TS.pins.pinned_message_changed_sig.add(C);
TS.pins.pinned_message_deleted_sig.add(C);
c=TS.storage.fetchChannelPageState();
if(!c.expanded_sections){c.expanded_sections={about:false,pinned_items:false,members:false}
}M=c.expanded_sections;
A=$("#details_tab");
A.append(TS.templates.channel_page_empty_state({state:c}));
n=A.find("#channel_page_scroller");
e=A.find(".channel_page_about .section_content.channel_purpose");
b=A.find(".channel_page_pinned_items .section_content.pinned_items");
Q=A.find(".channel_page_member_tabs");
f=A.find(".channel_page_member_lists");
z()
},showAboutSection:function(){if(!M.about){a("about")
}n.find(".channel_page_about").scrollintoview({offset:"top",px_offset:50})
},showPinsSection:function(){if(!M.pinned_items){a("pinned_items")
}n.find(".channel_page_pinned_items").scrollintoview({offset:"top",px_offset:50})
},showMembersSection:function(){if(!M.members){a("members")
}n.find(".channel_page_members").scrollintoview({offset:"top",px_offset:50})
},pinnedItemHtml:function(U,T){var V={item:U,model_ob:T};
if(U.type==="message"){V.is_message=true;
V.permalink=TS.utility.msgs.constructMsgPermalink(T,U.message.ts)
}else{if(U.type==="file"){V.is_file=true
}else{if(U.type==="file_comment"){V.is_comment=true
}}}return TS.templates.channel_page_pinned_item(V)
},highlightPinnedItemForRemoval:function(U){var T=s(U);
T.addClass("delete_mode")
},unHighlightPinnedItemForRemoval:function(U){var T=s(U);
T.removeClass("delete_mode")
}});
var A;
var n;
var e;
var b;
var Q;
var f;
var K=false;
var q=false;
var N;
var c;
var M;
var z=function(){A.on("click",".invite_link",function(){var T=TS.shared.getActiveModelOb();
if(T.is_channel){TS.ui.invite.showInviteMembersFromChannelDialog(T.id)
}else{if(T.is_group){TS.ui.invite.showInviteMembersFromGroupDialog(T.id)
}}});
A.on("click",".find_files_link",function(){var T=TS.shared.getActiveModelOb();
TS.search.setInputVal("in:"+(T.is_channel?"#":"")+T.name);
TS.search.setFilter("files");
TS.search.submitSearch()
});
A.on("click",".leave_link",function(){var T=TS.shared.getActiveModelOb();
if(T.is_channel){TS.channels.leave(T.id)
}else{if(T.is_group){TS.groups.leave(T.id)
}}});
A.on("click","a[data-member-id]",function(T){T.preventDefault();
var U=$(this).data("member-id");
TS.menu.startWithMember(T,U)
});
A.on("click",".section_header",function(V){var U=$(V.target).closest("[data-section-name]");
var T=U.data("section-name");
if(!T){return
}a(T)
});
A.on("click",".set_purpose",function(U){var T=TS.shared.getActiveModelOb();
TS.ui.purpose_dialog.start(T.name,T)
});
A.on("click",".pinned_item .remove_pin",function(Z){var T=TS.shared.getActiveModelOb();
var U=$(this).closest(".pinned_item");
var Y=U.data("ts");
var V=U.data("comment-id");
var X=U.data("file-id");
var W=U.data("type");
if(W==="message"){TS.pins.unPinMessage(Y.toString(),T)
}else{if(W==="file"){TS.pins.unPinFile(X,T)
}else{if(W==="file_comment"){TS.pins.unPinFileComment(V,X,T)
}}}Z.preventDefault()
});
A.on("click",".pinned_item .pin_metadata",function(T){if(TS.client.archives.maybeHandleArchiveLink($(this))){T.preventDefault();
return
}});
A.on("click",".pinned_item",function(T){TS.view.doLinkThings(T)
});
A.on("click",".pinned_item",function(X){if(X.isDefaultPrevented()||$(X.target).is("a")){return
}X.preventDefault();
var U=$(this).data("type");
var T=TS.shared.getActiveModelOb();
var W=$(this).data("ts");
var V=$(this).data("file-id");
if(U==="message"){TS.client.ui.tryToJump(T.id,W.toString())
}else{if(U==="file"||U==="file_comment"){TS.client.ui.previewFile(V)
}}})
};
var a=function(T){var U=TS.shared.getActiveModelOb();
var V=n.find('.channel_page_section[data-section-name="'+T+'"]');
if(V.length===0){return
}if(M[T]){M[T]=false;
if(T==="pinned_items"){h()
}V.removeClass("expanded")
}else{M[T]=true;
if(T==="pinned_items"){p(U)
}V.addClass("expanded")
}TS.storage.storeChannelPageState(c);
n.data("monkeyScroll").updateFunc();
E()
};
var d=function(){K=true
};
var y=function(U){var T=TS.model.ui_state.flex_name;
if(!T||(U==="details"&&T!=="details")){u();
q=false;
return
}if(!q&&T==="details"){q=true;
J()
}};
var w=function(){if(!K){return
}var T=TS.shared.getActiveModelOb();
if(!T){return
}if(TS.model.ui_state.flex_name==="details"){J()
}};
var H=function(T){if(!I(T)){return
}if(TS.model.ui_state.flex_name==="details"){J()
}};
var x=function(U){if(!i()){return
}if(!I(U)){return
}var T=TS.shared.getActiveModelOb();
m(T)
};
var g=function(U){if(!i()){return
}if(!I(U)){return
}var T=TS.shared.getActiveModelOb();
R(T);
m(T)
};
var F=function(U){if(!i()){return
}if(!I(U)){return
}var T=TS.shared.getActiveModelOb();
m(T);
B(T);
S(T)
};
var t=function(U){if(!i()){return
}if(!I(U)){return
}var T=TS.shared.getActiveModelOb();
B(T);
S(T)
};
var r=function(U){if(!U){return
}if(!i()){return
}var T=TS.shared.getActiveModelOb();
if(T&&T.members&&T.members.indexOf(U.id)>-1){B(T);
S(T)
}};
var l=function(){if(!i()){return
}var T=TS.shared.getActiveModelOb();
B(T);
S(T)
};
var k=function(){if(!i()){return
}var T=TS.shared.getActiveModelOb();
S(T)
};
var P=function(U){if(!i()){return
}var T=TS.shared.getActiveModelOb();
if(!T){return
}if(U.pinned_to&&U.pinned_to.indexOf(T.id)!==-1){p(T)
}};
var L=function(U,V){if(!i()){return
}var T=TS.shared.getActiveModelOb();
if(!T){return
}if(V.pinned_to&&V.pinned_to.indexOf(T.id)!==-1){p(T)
}};
var C=function(T){if(!i()){return
}if(!I(T)){return
}p(T)
};
var i=function(){return q
};
var I=function(U){var T=TS.shared.getActiveModelOb();
if(!T||!U||T.id!==U.id){return false
}return true
};
var J=function(){u();
var T=TS.shared.getActiveModelOb();
if(!T){return
}R(T);
if(T.is_im){n.addClass("channel_page_im")
}else{n.removeClass("channel_page_im");
m(T);
p(T);
B(T);
S(T)
}var U=n.data("monkeyScroll");
if(U){U.updateFunc()
}else{n.monkeyScroll()
}E()
};
var u=function(){j();
h();
o();
G()
};
var R=function(T){if(!T.is_im){if(T.is_channel){$("#channel_page_title").text("About This Channel");
$("#details_tab_header").text("Channel Info")
}else{$("#channel_page_title").text("About This Group");
$("#details_tab_header").text("Group Info")
}}};
var m=function(V){var Y={model_ob:V,show_set_purpose:(V.is_member||V.is_group)&&!TS.model.user.is_ultra_restricted&&(!V.is_general||TS.members.canUserPostInGeneral())};
var W=TS.model.user;
if(!W.is_ultra_restricted&&!V.is_archived&&(V.is_member||V.is_group)){if(V.is_channel){Y.show_invite=TS.channels.makeMembersWithPreselectsForTemplate(TS.channels.getActiveMembersNotInThisChannelForInviting(V.id)).length>0
}else{if(V.is_group){Y.show_invite=TS.channels.makeMembersWithPreselectsForTemplate(TS.groups.getActiveMembersNotInThisGroupForInviting(V.id)).length>0
}}if(V.is_channel){Y.show_leave=!V.is_general
}else{if(V.is_group){if(V.active_members.length>1){if(!W.is_restricted||TS.groups.canLeaveGroup(V.id)){Y.show_leave=true
}}else{}}}}var X=TS.members.getMemberById(V.creator);
if(X&&X.is_self){Y.creator_name="you"
}else{if(X){Y.creator_name=TS.members.getMemberDisplayName(X)
}else{Y.creator_name="unknown"
}}var U=TS.utility.date.toCalendarDateOrNamedDay(V.created);
var T="";
if($.trim(U.toLowerCase())=="yesterday"||$.trim(U.toLowerCase())=="today"){U=$.trim(U.toLowerCase())
}else{T="on "
}Y.creation_date=T+U;
e.html(TS.templates.channel_page_details(Y)).removeClass("hidden")
};
var p=function(T){if(!TS.boot_data.feature_pins){return
}h();
var V=T.pinned_items;
var U="";
if(V&&V.length>0){if(V.length===1){$("#pinned_items_title").text("1 Pinned Item")
}else{$("#pinned_items_title").text(V.length+" Pinned Items")
}}else{$("#pinned_items_title").text("Pinned Items")
}if(!M.pinned_items){return
}if(V&&V.length>0){V.forEach(function(W){if(W.file&&W.file.is_deleted){return
}v(W);
U+=TS.client.channel_page.pinnedItemHtml(W,T)
})
}else{U=TS.templates.channel_page_empty_pinned_items({model_ob:T})
}U=U.replace(/\ue000/g,"").replace(/\ue001/g,"");
b.html(U);
O()
};
var h=function(){if(!TS.boot_data.feature_pins){return
}b.empty()
};
var B=function(T){o();
var Y={model_ob:T};
var U=0;
var X=0;
var W=0;
var Z;
for(var V=0;
V<T.members.length;
V++){Z=TS.members.getMemberById(T.members[V]);
if(Z&&!Z.deleted){U++;
if(Z.presence==="active"){X++
}if(Z.is_restricted){W++
}}}Y.member_count=U;
Y.online_count=X;
Y.restricted_count=W;
Y.show_restricted_members=W>0;
Q.html(TS.templates.channel_page_member_tabs(Y));
Q.find(".restricted_members_count").tooltip()
};
var o=function(){Q.find(".restricted_members_count").tooltip("destroy");
Q.empty()
};
var S=function(T){G();
var W={model_ob:T};
var U=[];
var X;
for(var V=0;
V<T.members.length;
V++){X=TS.members.getMemberById(T.members[V]);
if(X&&!X.deleted){U.push(X)
}}U.sort(TS.members.memberSorterByActive);
W.members=U;
f.html(TS.templates.channel_page_member_lists(W));
O()
};
var G=function(){f.empty()
};
var O=function(){j();
N=n.find(".lazy").lazyload({container:n});
E()
};
var j=function(){if(N&&N.detachEvents){N.detachEvents();
N=null
}};
var D;
var E=function(){TS.utility.cancelRAF(D);
D=TS.utility.rAF(function(){n.trigger("resize-immediate")
})
};
var s=function(U){var T;
if(U.type==="message"){T=b.find('.pinned_item[data-type="message"][data-ts="'+U.message.ts+'"]')
}else{if(U.type==="file"){T=b.find('.pinned_item[data-type="file"][data-file-id="'+U.file.id+'"]')
}else{if(U.type==="file_comment"){T=b.find('.pinned_item[data-type="file_comment"][data-comment-id="'+U.comment.id+'"]')
}}}return T
};
var v=function(T){if(T.type!=="file_comment"){return
}var U=TS.files.getFileCommentById(T.file,T.comment.id);
T.comment=U
}
})();