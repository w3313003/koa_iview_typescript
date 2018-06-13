$(function() {
    const m_observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation);
          });
    });
    m_observer.observe($(".test")[0], {
        attributes: true,
        childList: true,
    })
    $(".btn").click(function() {
        console.log(32);
        $(".test").attr("data-index", 2);
    })
});