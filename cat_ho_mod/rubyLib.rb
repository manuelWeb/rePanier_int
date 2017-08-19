#!/usr/bin/env ruby
require "nokogiri"
require "open-uri"
require "net/https"
url  = "https://www.tempsl.fr/fr/"
path = "xxx/xxx/xxx/"
ext  = ".html"
# ref = ["1518216", "1902113", "1615111", "5663216"]
ref = ["2505410", "1902113", "1615111", "5663216"]
aryUrl = Array.new
aryLib = Array.new
# build full URL
ref.each {|i|
  aryUrl.push(url+path+i+ext)
}
# get full html of URL above then get lib
aryUrl.each {|i|
  # puts i
  aryLib.push( Nokogiri::HTML(open(i,  :ssl_verify_mode => OpenSSL::SSL::VERIFY_NONE)).at_css("#ctl00_ContentPlaceHolder1_LB_TITRE_PRODUIT").text.encode('iso-8859-1'))
}
# hash
tabLib = aryLib
cpt = 0
varSlim = ''
tabLib.each { |i|
  if cpt == 0
    # print "-$putLib = ["
    varSlim += "- $putLib = ["
  end
  # print '"' + i + '"'
  varSlim += '"' + i + '"'
  if cpt < tabLib.length-1
    # print ", "
    varSlim += ", "
  end
  cpt+=1
}
varSlim += "]"
txt = "_varLib << #{varSlim} "
txt = txt.encode('iso-8859-1')
puts "#{txt}"

output = File.open( "src/FR/var/_varLib.slim","w" )
output << varSlim
output.close
