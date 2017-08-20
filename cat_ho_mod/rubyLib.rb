#!/usr/bin/env ruby
require "nokogiri"
require "open-uri"
require "net/https"
url  = "https://www.tempsl.fr/fr/"
path = "xxx/xxx/xxx/"
ext  = ".html"
ref = [ "1615111", "1518216", "5663216", "1902113"]
aryUrl = Array.new
aryLib = Array.new
aryPri = Array.new
# build full URL
ref.each {|i|
  aryUrl.push(url+path+i+ext)
}
# get full html of URL above then get lib
aryUrl.each {|i|
  # puts i
  aryLib.push( Nokogiri::HTML(open(i,  :ssl_verify_mode => OpenSSL::SSL::VERIFY_NONE)).at_css("#ctl00_ContentPlaceHolder1_LB_TITRE_PRODUIT").text.encode('iso-8859-1'))
  aryPri.push( Nokogiri::HTML(open(i,  :ssl_verify_mode => OpenSSL::SSL::VERIFY_NONE)).at_css("#ctl00_ContentPlaceHolder1_LAB_PRIX_PRODUIT").text.encode('iso-8859-1'))
}
# hash lib
cpt = 0
varLib = ''
aryLib.each { |i|
  if cpt == 0
    # print "-$putLib = ["
    varLib += "- $putLib = ["
  end
  # print '"' + i + '"'
  varLib += '"' + i + '"'
  if cpt < aryLib.length-1
    # print ", "
    varLib += ", "
  end
  cpt+=1
}
varLib += "]"
txt = "_varLib << #{varLib} "
txt = txt.encode('iso-8859-1')
puts "#{txt}"


# hash price
cptPri = 0
varPri = ''
aryPri.each { |i|
  if cptPri == 0
    # print "-$putLib = ["
    varPri += "- $putPri = ["
  end
  # print '"' + i + '"'
  varPri += '"' + i + '"'
  if cptPri < aryLib.length-1
    # print ", "
    varPri += ", "
  end
  cptPri+=1
}
varPri += "]"
txt = "_varPri << #{varPri} "
txt = txt.encode('iso-8859-1')
puts "#{txt}"

# écriture _varLib.slim
output = File.open( "src/FR/var/_varLib.slim","w" )
output << varLib + "\n"
output << varPri
output.close

cpti = 0
ref.each {|i|
  puts i
  # get online image to save on src/FR/images
  File.open("src/FR/images/pk#{cpti}.jpg", "wb") do |saved_file|
    # the following "open" is provided by open-uri
    open("https://www.tempsl.fr/Visuels/Produits/zoom/#{i}_WEB1.jpg", "rb") do |read_file|
      saved_file.write(read_file.read)
    end
  end
  cpti+=1
}
