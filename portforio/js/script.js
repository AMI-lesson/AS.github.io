$(function () {
  // ✅ハンバーガー
  $("#hamburger").on("click", function () {
    const $this = $(this);
    const $gnav = $("#gnav");
    const $container = $(".header .container");
    const $menuLabel = $(".menu-label");

    // ハンバーガーアイコンの状態を切り替え
    $this.toggleClass("open");

    // メニューの表示/非表示を切り替え
    if ($this.hasClass("open")) {
      $gnav.addClass("open").slideDown(300);
      $container.addClass("container-open");
      $menuLabel.fadeIn();
    } else {
      $gnav.removeClass("open").slideUp(300, function () {
        $container.removeClass("container-open");
      });
      $menuLabel.fadeOut();
    }
  });

  // メニュー項目をクリックしたときの処理
  $(".gnav__item a").on("click", function () {
    const $hamburger = $("#hamburger");
    const $gnav = $("#gnav");
    const $container = $(".header .container");
    const $menuLabel = $(".menu-label");

    // メニューを閉じる
    $hamburger.removeClass("open");
    $gnav.removeClass("open").slideUp(300, function () {
      $container.removeClass("container-open");
    });
    $menuLabel.fadeOut(); // ← この行を追加
  });

  // ウィンドウサイズが変更されたときの処理
  $(window).on("resize", function () {
    if ($(window).width() > 768) {
      const $hamburger = $("#hamburger");
      const $gnav = $("#gnav");
      const $container = $(".header .container");
      const $menuLabel = $(".menu-label");

      $hamburger.removeClass("open");
      $gnav.removeClass("open").removeAttr("style");
      $container.removeClass("container-open");
      $menuLabel.hide(); // ← この行を追加
    }

    // ウィンドウサイズ変更時にもっと見る機能を再適用
    initializeWorksDisplay();
  });

  // worksカルーセル
  const carousel = document.querySelector(".works-carousel");
  const slideWidth = window.innerWidth;
  const totalSlides = document.querySelectorAll(".works-slide").length;

  let currentSlide = 0;

  document.querySelector(".carousel-next").addEventListener("click", () => {
    currentSlide++;

    if (currentSlide >= totalSlides) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
      currentSlide = 0;
    } else {
      carousel.scrollBy({ left: slideWidth, behavior: "smooth" });
    }
  });

  document.querySelector(".carousel-prev").addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      carousel.scrollBy({ left: -slideWidth, behavior: "smooth" });
    } else {
      currentSlide = totalSlides - 1;
      carousel.scrollTo({
        left: slideWidth * currentSlide,
        behavior: "smooth",
      });
    }
  });

  // ✅ worksセクションの初期表示を設定する関数
  function initializeWorksDisplay() {
    $(".works-section").each(function () {
      const $section = $(this);
      const $items = $section.find(".works__item");
      const $moreButton = $section.find(".works__more-button");

      // 画面サイズに応じて表示数を決定
      const visibleCount = $(window).width() <= 768 ? 4 : 6;

      // 全てのアイテムを一度表示
      $items.removeClass("hidden");

      // 指定数を超えるアイテムを非表示
      $items.slice(visibleCount).addClass("hidden");

      // 非表示のアイテムがある場合のみ「もっと見る」ボタンを表示
      if ($items.length > visibleCount) {
        $moreButton.show();
      } else {
        $moreButton.hide();
      }
    });
  }

  // ページ読み込み時に初期表示を設定
  initializeWorksDisplay();

  // ✅ 「もっと見る」ボタンの処理
  $(".works__more-button").on("click", function (e) {
    e.preventDefault();

    const $section = $(this).closest(".works-section");
    const $hiddenItems = $section.find(".works__item.hidden");

    // 隠されているアイテムを全て表示
    $hiddenItems.removeClass("hidden");

    // ボタンを非表示
    $(this).fadeOut();
  });

  // ✅ スクロール時にトップに戻るボタン表示
  window.onscroll = function () {
    const btn = document.getElementById("scrollToTopBtn");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  // ✅ トップへ戻るを押すとトップに行く
  document.getElementById("scrollToTopBtn").onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});
