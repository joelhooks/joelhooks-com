# Title : Emoji on octupress
# Author: Aaron Huang (@aar0ntw)
# Description: Use Emoji on your octupress.
# Example:
# {% emoji smile %}

module Jekyll
  @emoji = ''
  class EmojiTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      if markup =~ /([a-z0-9\+\-_]+)/
        @emoji = $1
      end
      super
    end
    
    def render(context)
      if @emoji
        "<i class='emoji #{@emoji}'></i>"        
      else
        "Error processing input, expected syntax: {% emoji emoji_name %}"
      end
    end
  end
end

Liquid::Template.register_tag('emoji', Jekyll::EmojiTag)
