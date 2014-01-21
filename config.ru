#!/usr/bin/env rackup

use Rack::ContentLength

# Thanks, Internetz!
# http://stackoverflow.com/questions/3863781/ruby-rack-mounting-a-simple-web-server-that-reads-index-html-as-default
@root = Dir.pwd

run Proc.new { |env|
  # Extract the requested path from the request
  path = Rack::Utils.unescape(env['PATH_INFO'])
  index_file = @root + "#{path}/index.html"

  if File.exists?(index_file)
    # Return the index
    [200, {'Content-Type' => 'text/html'}, [File.read(index_file)]]
  else
    # Pass the request to the directory app
    Rack::Directory.new(@root).call(env)
  end
}
