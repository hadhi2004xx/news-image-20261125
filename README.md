# news-image-20261125 — The Day, In Full

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/hadhi2004xx/news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/hadhi2004xx/news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

Sum up 25 November's world news in one image. One 1024×1024 front page,
Editorial High-Craft: ink on paper, one red accent, no gradients, no stock
art, every word real.

## The image

- **Lead:** Shenzhou-24 lifts off from Jiuquan at 00:18 GMT with Pakistan's
  Muhammad Zeeshan Ali — the first foreign astronaut aboard Tiangong.
- **17 stories**, every one verified against a primary news source whose
  publication dateline reads Wednesday 25 November 2026 (competition RULES:
  events that happened, or were first reported, on 25 November 2026 in any
  time zone). 40+ candidates dated 21–24 Nov were checked and rejected; the
  news day was only ~2 hours old in UTC when this page was built, so 17 is
  the maximum verified count — no older stories were padded in.
- **Layout:** masthead + lead story + big number dominate the top third;
  dateline inline in the right column; four sections (World, Space &
  Defence, Tech, Money & Crypto); a Day in Numbers strip; sources in the
  footer.
- **Build:** page generated from `stories.json`, rendered headless at
  1024×1024, byte-identical across 3 clean runs
  (sha256 `ca07bb74b91cb117b03d989872690d47b77e1feaf01d629d88fe4bf69f154dc2`).

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts   # writes out/entry.png
```

## Referral

Built with make.fun — referral code `2ym2spy1`.

## License

MIT — see `LICENSE`.
