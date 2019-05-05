const { CMS, h, createClass } = window || {};

if (!CMS) {
  console.warn("CMS is not on the window object or window doesn't exist");
} else {
  customizeNetlifyCMS();
}

const dateOptions = {
  day: "numeric",
  month: "short",
  year: "numeric"
};

function customizeNetlifyCMS() {
  const PostPreview = createClass({
    render: function() {
      const entry = this.props.entry;
      const featured_image = entry.getIn(["data", "featured_image"]);
      const featured_url = this.props.getAsset(featured_image);
      const is_featured = entry.getIn(["data", "featured"]);
      const repo = entry.getIn(["data", "repo"]);
      const subtitle = entry.getIn(["data", "subtitle"]);
      return h(
        "div",
        { className: `[post ${is_featured ? "featured" : ""}` },
        h("div", {
          className: "featured-image",
          style: {
            backgroundImage: `url(${featured_url && featured_url.toString()})`
          }
        }),
        h(
          "main",
          {},
          h("h1", {}, entry.getIn(["data", "title"])),
          subtitle ? h("h2", {}, subtitle) : null,
          repo
            ? h(
                "div",
                { className: "repo" },
                "Repo: ",
                h(
                  "a",
                  { href: repo, target: "_blank", rel: "noopener noreferrer" },
                  repo
                )
              )
            : null,
          h("hr", {}),
          h(
            "small",
            {},
            h(
              "date",
              {},
              entry
                .getIn(["data", "date"])
                .toLocaleDateString("default", dateOptions)
            ),
            h(
              "ul",
              { className: "tags" },
              entry.getIn(["data", "tags"]).map(function(tag) {
                return tag ? h("li", {}, tag) : null;
              })
            )
          ),
          h("hr", {}),
          h("article", { className: "body" }, this.props.widgetFor("body"))
        )
      );
    }
  });

  CMS.registerPreviewTemplate("posts", PostPreview);
  CMS.registerPreviewTemplate("projects", PostPreview);
}
