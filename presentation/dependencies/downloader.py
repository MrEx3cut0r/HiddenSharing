import io

def file_iterator(file_object):
	while chunk := file_object.read(8192):
		yield chunk