(function () {
  'use strict';

  var USER_ID = 7734643;
  var BASE_URL = 'https://api.stackexchange.com/2.3';
  var CONTAINER_ID = 'so-stats';

  var FALLBACK = {
    reputation: '~11k',
    reached: '~775k',
    answers: '~250',
    questions: '~13',
    topTags: ['swift', 'ios', 'keyboard-events', 'nsnotificationcenter', 'swift4.2'],
    badges: { gold: 0, silver: 0, bronze: 0 }
  };

  function formatNumber(num) {
    if (num >= 1000000) return '~' + (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return '~' + Math.round(num / 1000) + 'k';
    return '~' + num.toLocaleString();
  }

  function renderStats(stats) {
    var el = document.getElementById(CONTAINER_ID);
    if (!el) return;

    var badgesHtml = '';
    if (stats.badges.gold || stats.badges.silver || stats.badges.bronze) {
      badgesHtml = '<div class="so-badges">';
      if (stats.badges.gold) badgesHtml += '<span class="badge badge-gold">' + stats.badges.gold + ' gold</span>';
      if (stats.badges.silver) badgesHtml += '<span class="badge badge-silver">' + stats.badges.silver + ' silver</span>';
      if (stats.badges.bronze) badgesHtml += '<span class="badge badge-bronze">' + stats.badges.bronze + ' bronze</span>';
      badgesHtml += '</div>';
    }

    el.innerHTML =
      '<h3 class="so-heading">' +
      '  <svg class="icon icon-lg" aria-hidden="true"><use href="assets/icons.svg#icon-stackoverflow"></use></svg>' +
      '  Stack Overflow' +
      '</h3>' +
      '<dl class="so-grid">' +
      '  <div class="so-stat"><dt>Reputation</dt><dd>' + stats.reputation + '</dd></div>' +
      '  <div class="so-stat"><dt>People reached</dt><dd>' + stats.reached + '</dd></div>' +
      '  <div class="so-stat"><dt>Answers</dt><dd>' + stats.answers + '</dd></div>' +
      '  <div class="so-stat"><dt>Questions</dt><dd>' + stats.questions + '</dd></div>' +
      '</dl>' +
      '<div class="so-tags">' +
      '  <span class="so-tags-label">Top tags:</span>' +
      '  <span class="tag-list">' +
          stats.topTags.map(function (tag) { return '<span class="tag">' + tag + '</span>'; }).join('') +
      '  </span>' +
      '</div>' +
      badgesHtml +
      '<a href="https://stackoverflow.com/users/' + USER_ID + '/rakesha-shastri" target="_blank" rel="noopener noreferrer" class="so-profile-link">' +
      '  View full profile &rarr;' +
      '</a>';
  }

  function fetchStats() {
    Promise.all([
      fetch(BASE_URL + '/users/' + USER_ID + '?site=stackoverflow'),
      fetch(BASE_URL + '/users/' + USER_ID + '/top-tags?site=stackoverflow&pagesize=5')
    ])
      .then(function (responses) {
        if (!responses[0].ok || !responses[1].ok) throw new Error('API request failed');
        return Promise.all([responses[0].json(), responses[1].json()]);
      })
      .then(function (data) {
        var user = data[0].items[0];
        var tags = data[1].items;

        renderStats({
          reputation: formatNumber(user.reputation),
          reached: FALLBACK.reached,
          answers: user.answer_count || FALLBACK.answers,
          questions: user.question_count || FALLBACK.questions,
          topTags: tags.length ? tags.map(function (t) { return t.tag_name; }) : FALLBACK.topTags,
          badges: user.badge_counts || FALLBACK.badges
        });
      })
      .catch(function (e) {
        console.warn('SO API failed, using fallback:', e);
      });
  }

  // Render fallback immediately, then fetch live data
  renderStats(FALLBACK);
  fetchStats();
})();
